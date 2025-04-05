import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { createClient } from '@/app/lib/supabase/server';
import { formattedDate } from '@/app/lib/utils';

// Initialize auth for Google Sheets API
const initializeGoogleAuth = () => {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!serviceAccountEmail || !privateKey) {
    throw new Error('Google API credentials are not configured');
  }
  
  return new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Get sheet by ID and initialize it
const getSpreadsheet = async (sheetId: string) => {
  const auth = initializeGoogleAuth();
  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  return doc;
};

// Export contact form submissions to sheet
export const exportContactSubmissionsToSheet = async () => {
  const supabase = createClient();
  const sheetId = process.env.CONTACT_SUBMISSIONS_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('Contact submissions sheet ID is not configured');
  }
  
  // Get all unprocessed contact submissions
  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('exported_to_sheet', false)
    .order('created_at', { ascending: true });
    
  if (error || !submissions) {
    console.error('Error fetching contact submissions:', error);
    return { success: false, error };
  }
  
  if (submissions.length === 0) {
    return { success: true, message: 'No new submissions to export' };
  }
  
  try {
    const doc = await getSpreadsheet(sheetId);
    
    // Get or create the sheet
    let sheet = doc.sheetsByTitle['Contact Submissions'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Contact Submissions', headerValues: [
        'ID', 'Submission Date', 'Name', 'Email', 'Phone', 'Subject', 'Message'
      ]});
    }
    
    // Prepare rows for the sheet
    const rows = submissions.map(submission => ({
      ID: submission.id,
      'Submission Date': formattedDate(submission.created_at),
      Name: submission.name,
      Email: submission.email,
      Phone: submission.phone || 'N/A',
      Subject: submission.subject,
      Message: submission.message
    }));
    
    // Add rows to the sheet
    await sheet.addRows(rows);
    
    // Mark submissions as exported
    const ids = submissions.map(s => s.id);
    const { error: updateError } = await supabase
      .from('contact_submissions')
      .update({ 
        exported_to_sheet: true,
        exported_at: new Date().toISOString()
      })
      .in('id', ids);
      
    if (updateError) {
      console.error('Error updating submissions status:', updateError);
      return { success: false, error: updateError };
    }
    
    // Log the export to the spreadsheet_exports table
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'contacts',
        sheet_id: sheetId,
        rows_exported: rows.length,
        status: 'completed',
        completed_at: new Date().toISOString()
      });
    
    return { 
      success: true, 
      message: `Successfully exported ${rows.length} contact submissions` 
    };
  } catch (error) {
    console.error('Error exporting contact submissions to sheet:', error);
    
    // Log the failed export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'contacts',
        sheet_id: sheetId,
        rows_exported: 0,
        status: 'failed',
        error_message: (error as Error).message || 'Unknown error'
      });
      
    return { success: false, error };
  }
};

// Export dungeon bookings to sheet
export const exportBookingsToSheet = async () => {
  const supabase = createClient();
  const sheetId = process.env.BOOKINGS_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('Bookings sheet ID is not configured');
  }
  
  // Get all unprocessed bookings with user information
  const { data: bookings, error } = await supabase
    .from('dungeon_bookings')
    .select(`
      *,
      profiles:user_id (
        email,
        full_name
      )
    `)
    .eq('exported_to_sheet', false)
    .order('created_at', { ascending: true });
    
  if (error || !bookings) {
    console.error('Error fetching bookings:', error);
    return { success: false, error };
  }
  
  if (bookings.length === 0) {
    return { success: true, message: 'No new bookings to export' };
  }
  
  try {
    const doc = await getSpreadsheet(sheetId);
    
    // Get or create the sheet
    let sheet = doc.sheetsByTitle['Dungeon Bookings'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Dungeon Bookings', headerValues: [
        'ID', 'Created Date', 'User Name', 'User Email', 'Booking Date', 'Duration', 
        'Price', 'Status', 'Package Type', 'Special Requests'
      ]});
    }
    
    // Prepare rows for the sheet
    const rows = bookings.map(booking => ({
      ID: booking.id,
      'Created Date': formattedDate(booking.created_at),
      'User Name': booking.profiles?.full_name || 'N/A',
      'User Email': booking.profiles?.email || 'N/A',
      'Booking Date': formattedDate(booking.booking_date),
      Duration: `${booking.duration} hours`,
      Price: `$${booking.price}`,
      Status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      'Package Type': booking.package_type || 'Standard',
      'Special Requests': booking.special_requests || 'None'
    }));
    
    // Add rows to the sheet
    await sheet.addRows(rows);
    
    // Mark bookings as exported
    const ids = bookings.map(b => b.id);
    const { error: updateError } = await supabase
      .from('dungeon_bookings')
      .update({ 
        exported_to_sheet: true,
        exported_at: new Date().toISOString()
      })
      .in('id', ids);
      
    if (updateError) {
      console.error('Error updating bookings status:', updateError);
      return { success: false, error: updateError };
    }
    
    // Log the export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'bookings',
        sheet_id: sheetId,
        rows_exported: rows.length,
        status: 'completed',
        completed_at: new Date().toISOString()
      });
    
    return { 
      success: true, 
      message: `Successfully exported ${rows.length} bookings` 
    };
  } catch (error) {
    console.error('Error exporting bookings to sheet:', error);
    
    // Log the failed export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'bookings',
        sheet_id: sheetId,
        rows_exported: 0,
        status: 'failed',
        error_message: (error as Error).message || 'Unknown error'
      });
      
    return { success: false, error };
  }
};

// Export payment transactions to sheet
export const exportPaymentsToSheet = async () => {
  const supabase = createClient();
  const sheetId = process.env.PAYMENTS_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('Payments sheet ID is not configured');
  }
  
  // Get all unprocessed payment transactions with user information
  const { data: payments, error } = await supabase
    .from('payment_transactions')
    .select(`
      *,
      profiles:user_id (
        email,
        full_name
      )
    `)
    .eq('exported_to_sheet', false)
    .order('created_at', { ascending: true });
    
  if (error || !payments) {
    console.error('Error fetching payments:', error);
    return { success: false, error };
  }
  
  if (payments.length === 0) {
    return { success: true, message: 'No new payments to export' };
  }
  
  try {
    const doc = await getSpreadsheet(sheetId);
    
    // Get or create the sheet
    let sheet = doc.sheetsByTitle['Payment Transactions'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Payment Transactions', headerValues: [
        'ID', 'Created Date', 'User Name', 'User Email', 'Amount', 'Currency', 
        'Status', 'Payment Method', 'Reference Type', 'Reference ID'
      ]});
    }
    
    // Prepare rows for the sheet
    const rows = payments.map(payment => ({
      ID: payment.id,
      'Created Date': formattedDate(payment.created_at),
      'User Name': payment.profiles?.full_name || 'N/A',
      'User Email': payment.profiles?.email || 'N/A',
      Amount: `${payment.currency} ${payment.amount}`,
      Currency: payment.currency,
      Status: payment.status.charAt(0).toUpperCase() + payment.status.slice(1),
      'Payment Method': payment.provider,
      'Reference Type': payment.reference_type.charAt(0).toUpperCase() + payment.reference_type.slice(1),
      'Reference ID': payment.reference_id
    }));
    
    // Add rows to the sheet
    await sheet.addRows(rows);
    
    // Mark payments as exported
    const ids = payments.map(p => p.id);
    const { error: updateError } = await supabase
      .from('payment_transactions')
      .update({ 
        exported_to_sheet: true,
        exported_at: new Date().toISOString()
      })
      .in('id', ids);
      
    if (updateError) {
      console.error('Error updating payments status:', updateError);
      return { success: false, error: updateError };
    }
    
    // Log the export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'payments',
        sheet_id: sheetId,
        rows_exported: rows.length,
        status: 'completed',
        completed_at: new Date().toISOString()
      });
    
    return { 
      success: true, 
      message: `Successfully exported ${rows.length} payment transactions` 
    };
  } catch (error) {
    console.error('Error exporting payments to sheet:', error);
    
    // Log the failed export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'payments',
        sheet_id: sheetId,
        rows_exported: 0,
        status: 'failed',
        error_message: (error as Error).message || 'Unknown error'
      });
      
    return { success: false, error };
  }
};

// Export class registrations to sheet
export const exportClassRegistrationsToSheet = async () => {
  const supabase = createClient();
  const sheetId = process.env.CLASS_REGISTRATIONS_SHEET_ID;
  
  if (!sheetId) {
    throw new Error('Class registrations sheet ID is not configured');
  }
  
  // Get all unprocessed class registrations with user information
  const { data: registrations, error } = await supabase
    .from('class_registrations')
    .select(`
      *,
      profiles:user_id (
        email,
        full_name
      )
    `)
    .eq('exported_to_sheet', false)
    .order('created_at', { ascending: true });
    
  if (error || !registrations) {
    console.error('Error fetching class registrations:', error);
    return { success: false, error };
  }
  
  if (registrations.length === 0) {
    return { success: true, message: 'No new class registrations to export' };
  }
  
  try {
    const doc = await getSpreadsheet(sheetId);
    
    // Get or create the sheet
    let sheet = doc.sheetsByTitle['Class Registrations'];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Class Registrations', headerValues: [
        'ID', 'Created Date', 'User Name', 'User Email', 'Class ID', 
        'Attendees', 'Status', 'Payment Status'
      ]});
    }
    
    // Prepare rows for the sheet
    const rows = registrations.map(registration => ({
      ID: registration.id,
      'Created Date': formattedDate(registration.created_at),
      'User Name': registration.profiles?.full_name || 'N/A',
      'User Email': registration.profiles?.email || 'N/A',
      'Class ID': registration.class_id,
      Attendees: registration.attendees,
      Status: registration.status.charAt(0).toUpperCase() + registration.status.slice(1),
      'Payment Status': registration.payment_status.charAt(0).toUpperCase() + registration.payment_status.slice(1)
    }));
    
    // Add rows to the sheet
    await sheet.addRows(rows);
    
    // Mark registrations as exported
    const ids = registrations.map(r => r.id);
    const { error: updateError } = await supabase
      .from('class_registrations')
      .update({ 
        exported_to_sheet: true,
        exported_at: new Date().toISOString()
      })
      .in('id', ids);
      
    if (updateError) {
      console.error('Error updating class registrations status:', updateError);
      return { success: false, error: updateError };
    }
    
    // Log the export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'classes',
        sheet_id: sheetId,
        rows_exported: rows.length,
        status: 'completed',
        completed_at: new Date().toISOString()
      });
    
    return { 
      success: true, 
      message: `Successfully exported ${rows.length} class registrations` 
    };
  } catch (error) {
    console.error('Error exporting class registrations to sheet:', error);
    
    // Log the failed export
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'classes',
        sheet_id: sheetId,
        rows_exported: 0,
        status: 'failed',
        error_message: (error as Error).message || 'Unknown error'
      });
      
    return { success: false, error };
  }
}; 