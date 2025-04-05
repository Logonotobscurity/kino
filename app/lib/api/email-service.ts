import { createClient } from '@/app/lib/supabase/server';
import { formattedDate } from '@/app/lib/utils';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
  referenceType?: string;
  referenceId?: string;
}

/**
 * Service for sending emails via the email provider
 * This is a placeholder that logs to database and would integrate 
 * with a real email provider like SendGrid, Mailgun, etc.
 */
export const EmailService = {
  /**
   * Send an email through the configured provider
   */
  async sendEmail(options: EmailOptions) {
    const supabase = createClient();
    
    try {
      // Insert record into email_notifications table
      const { data, error } = await supabase
        .from('email_notifications')
        .insert({
          recipient_email: options.to,
          subject: options.subject,
          body: options.body,
          template_id: options.templateId,
          status: 'pending', // Will be updated when email actually sent
          reference_type: options.referenceType,
          reference_id: options.referenceId
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating email notification:', error);
        return { success: false, error };
      }
      
      // In a real implementation, we'd send the email via SendGrid, Mailgun, etc.
      // For now, we'll simulate successful sending
      
      // Update the status to 'sent'
      const { error: updateError } = await supabase
        .from('email_notifications')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', data.id);
        
      if (updateError) {
        console.error('Error updating email status:', updateError);
        return { success: false, error: updateError };
      }
      
      return { success: true, messageId: data.id };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  },
  
  /**
   * Send a contact form submission confirmation
   */
  async sendContactFormConfirmation(name: string, email: string, subject: string, submissionId: string) {
    const emailBody = `
      <h2>Thank you for contacting Kinkoasis</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry about "${subject}". Our team will review your message and get back to you as soon as possible.</p>
      <p>Your submission reference: ${submissionId}</p>
      <p>Thank you for your interest in Kinkoasis.</p>
      <p>Regards,<br>The Kinkoasis Team</p>
    `;
    
    return this.sendEmail({
      to: email,
      subject: 'We received your message - Kinkoasis',
      body: emailBody,
      referenceType: 'contact',
      referenceId: submissionId
    });
  },
  
  /**
   * Send notification to admin about new contact form submission
   */
  async notifyAdminAboutContactForm(submission: any) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kinkoasis.com';
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${submission.name} (${submission.email})</p>
      <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${submission.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message}</p>
      <p><strong>Submission ID:</strong> ${submission.id}</p>
      <p><strong>Submitted on:</strong> ${formattedDate(submission.created_at)}</p>
    `;
    
    return this.sendEmail({
      to: adminEmail,
      subject: `New Contact Form: ${submission.subject}`,
      body: emailBody,
      referenceType: 'contact',
      referenceId: submission.id
    });
  },
  
  /**
   * Send booking confirmation to customer
   */
  async sendBookingConfirmation(booking: any, userEmail: string, userName: string) {
    const emailBody = `
      <h2>Your Kinkoasis Booking Confirmation</h2>
      <p>Dear ${userName || 'Valued Customer'},</p>
      <p>Thank you for your booking with Kinkoasis. Your reservation details are as follows:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking.id}</li>
        <li><strong>Date:</strong> ${formattedDate(booking.booking_date)}</li>
        <li><strong>Duration:</strong> ${booking.duration} hours</li>
        <li><strong>Package:</strong> ${booking.package_type || 'Standard'}</li>
        <li><strong>Price:</strong> $${booking.price}</li>
        <li><strong>Status:</strong> ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</li>
      </ul>
      
      ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
      
      <p>If you need to modify or cancel your booking, please contact us at least 24 hours in advance.</p>
      <p>We look forward to seeing you!</p>
      <p>Regards,<br>The Kinkoasis Team</p>
    `;
    
    return this.sendEmail({
      to: userEmail,
      subject: 'Your Kinkoasis Booking Confirmation',
      body: emailBody,
      referenceType: 'booking',
      referenceId: booking.id
    });
  },
  
  /**
   * Send booking notification to admin
   */
  async notifyAdminAboutBooking(booking: any, userEmail: string, userName: string) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kinkoasis.com';
    const emailBody = `
      <h2>New Booking Notification</h2>
      <p><strong>Customer:</strong> ${userName || 'Unknown'} (${userEmail})</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li><strong>Booking ID:</strong> ${booking.id}</li>
        <li><strong>Date:</strong> ${formattedDate(booking.booking_date)}</li>
        <li><strong>Duration:</strong> ${booking.duration} hours</li>
        <li><strong>Package:</strong> ${booking.package_type || 'Standard'}</li>
        <li><strong>Price:</strong> $${booking.price}</li>
        <li><strong>Status:</strong> ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</li>
      </ul>
      
      ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
      
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/admin/bookings/${booking.id}">View booking details</a></p>
    `;
    
    return this.sendEmail({
      to: adminEmail,
      subject: 'New Kinkoasis Booking',
      body: emailBody,
      referenceType: 'booking',
      referenceId: booking.id
    });
  },
  
  /**
   * Send payment receipt to customer
   */
  async sendPaymentReceipt(payment: any, userEmail: string, userName: string) {
    const emailBody = `
      <h2>Payment Receipt - Kinkoasis</h2>
      <p>Dear ${userName || 'Valued Customer'},</p>
      <p>Thank you for your payment. Below is your receipt:</p>
      <ul>
        <li><strong>Transaction ID:</strong> ${payment.id}</li>
        <li><strong>Date:</strong> ${formattedDate(payment.created_at)}</li>
        <li><strong>Amount:</strong> ${payment.currency} ${payment.amount}</li>
        <li><strong>Status:</strong> ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</li>
        <li><strong>Payment Method:</strong> ${payment.provider} (ending in ${payment.card_last4 || 'xxxx'})</li>
      </ul>
      
      <p><strong>For:</strong> ${payment.reference_type.charAt(0).toUpperCase() + payment.reference_type.slice(1)}</p>
      
      <p>If you have any questions about this transaction, please contact our customer support.</p>
      <p>Thank you for choosing Kinkoasis.</p>
      <p>Regards,<br>The Kinkoasis Team</p>
    `;
    
    return this.sendEmail({
      to: userEmail,
      subject: 'Your Kinkoasis Payment Receipt',
      body: emailBody,
      referenceType: 'payment',
      referenceId: payment.id
    });
  },
  
  /**
   * Send class registration confirmation
   */
  async sendClassRegistrationConfirmation(registration: any, className: string, userEmail: string, userName: string) {
    const emailBody = `
      <h2>Class Registration Confirmation - Kinkoasis</h2>
      <p>Dear ${userName || 'Valued Customer'},</p>
      <p>Thank you for registering for our class. Your registration details are as follows:</p>
      <ul>
        <li><strong>Class:</strong> ${className}</li>
        <li><strong>Registration ID:</strong> ${registration.id}</li>
        <li><strong>Number of Attendees:</strong> ${registration.attendees}</li>
        <li><strong>Status:</strong> ${registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}</li>
        <li><strong>Payment Status:</strong> ${registration.payment_status.charAt(0).toUpperCase() + registration.payment_status.slice(1)}</li>
      </ul>
      
      <p>We look forward to seeing you at the class!</p>
      <p>Regards,<br>The Kinkoasis Team</p>
    `;
    
    return this.sendEmail({
      to: userEmail,
      subject: 'Your Kinkoasis Class Registration',
      body: emailBody,
      referenceType: 'class',
      referenceId: registration.id
    });
  }
}; 