-- Kinkoasis Booking, Forms, and Payment Schema
-- This SQL creates tables for managing user submissions, reservations, and payments

-- Table for contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP WITH TIME ZONE,
  exported_to_sheet BOOLEAN DEFAULT FALSE,
  exported_at TIMESTAMP WITH TIME ZONE
);

-- Table for dungeon bookings/reservations
CREATE TABLE dungeon_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- Duration in hours
  price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  special_requests TEXT,
  package_type TEXT, -- standard, premium, etc.
  add_ons JSONB,
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMP WITH TIME ZONE,
  exported_to_sheet BOOLEAN DEFAULT FALSE,
  exported_at TIMESTAMP WITH TIME ZONE
);

-- Table for class registrations
CREATE TABLE class_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  class_id UUID NOT NULL, -- Reference to a classes table
  attendees INTEGER DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'registered', -- registered, cancelled, attended
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, refunded
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMP WITH TIME ZONE,
  exported_to_sheet BOOLEAN DEFAULT FALSE,
  exported_at TIMESTAMP WITH TIME ZONE
);

-- Table for customer payment information
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  provider TEXT NOT NULL, -- stripe, paypal, etc.
  payment_method_id TEXT NOT NULL, -- ID from the payment provider
  card_last4 TEXT,
  card_brand TEXT,
  expiry_month INTEGER,
  expiry_year INTEGER,
  is_default BOOLEAN DEFAULT FALSE,
  billing_address JSONB,
  metadata JSONB
);

-- Table for payment transactions
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL, -- succeeded, pending, failed
  provider TEXT NOT NULL, -- stripe, paypal, etc.
  provider_transaction_id TEXT,
  payment_method_id UUID REFERENCES payment_methods(id),
  reference_type TEXT NOT NULL, -- booking, class, product, membership
  reference_id UUID NOT NULL, -- ID of the booking, class, product, or membership
  receipt_sent BOOLEAN DEFAULT FALSE,
  receipt_sent_at TIMESTAMP WITH TIME ZONE,
  exported_to_sheet BOOLEAN DEFAULT FALSE,
  exported_at TIMESTAMP WITH TIME ZONE
);

-- Table for email notifications
CREATE TABLE email_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  template_id TEXT, -- If using template system
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, failed
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  reference_type TEXT, -- booking, payment, contact, class
  reference_id UUID
);

-- Table for spreadsheet exports
CREATE TABLE spreadsheet_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  export_type TEXT NOT NULL, -- bookings, payments, contacts, classes
  sheet_id TEXT NOT NULL, -- ID of the Google Sheet
  rows_exported INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, failed
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- RLS Policies

-- Contact submissions policy
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins can view contact submissions
CREATE POLICY "Admins can view contact submissions" 
ON contact_submissions FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Bookings policies
ALTER TABLE dungeon_bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view their own bookings" 
ON dungeon_bookings FOR SELECT 
USING (auth.uid() = user_id);

-- Class registrations policies
ALTER TABLE class_registrations ENABLE ROW LEVEL SECURITY;

-- Users can view their own class registrations
CREATE POLICY "Users can view their own class registrations" 
ON class_registrations FOR SELECT 
USING (auth.uid() = user_id);

-- Payment methods policies
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own payment methods
CREATE POLICY "Users can view their own payment methods" 
ON payment_methods FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" 
ON payment_methods FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" 
ON payment_methods FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods" 
ON payment_methods FOR DELETE 
USING (auth.uid() = user_id);

-- Payment transactions policies
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment transactions
CREATE POLICY "Users can view their own payment transactions" 
ON payment_transactions FOR SELECT 
USING (auth.uid() = user_id);

-- Functions and Triggers

-- Function to send email notification when a new booking is created
CREATE OR REPLACE FUNCTION notify_new_booking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_notifications (recipient_email, subject, body, reference_type, reference_id)
  VALUES (
    (SELECT email FROM auth.users WHERE id = NEW.user_id),
    'Your Kinkoasis Booking Confirmation',
    'Thank you for your booking with Kinkoasis. Your booking details: Date: ' || NEW.booking_date || ', Duration: ' || NEW.duration || ' hours',
    'booking',
    NEW.id
  );
  
  -- Also notify admin
  INSERT INTO email_notifications (recipient_email, subject, body, reference_type, reference_id)
  VALUES (
    'admin@kinkoasis.com',
    'New Booking Notification',
    'A new booking has been created. Booking ID: ' || NEW.id || ', User ID: ' || NEW.user_id || ', Date: ' || NEW.booking_date,
    'booking',
    NEW.id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_booking
  AFTER INSERT ON dungeon_bookings
  FOR EACH ROW EXECUTE FUNCTION notify_new_booking();

-- Function to mark records for spreadsheet export
CREATE OR REPLACE FUNCTION mark_for_spreadsheet_export()
RETURNS TRIGGER AS $$
BEGIN
  NEW.exported_to_sheet := FALSE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER mark_booking_for_export
  BEFORE INSERT ON dungeon_bookings
  FOR EACH ROW EXECUTE FUNCTION mark_for_spreadsheet_export();

CREATE TRIGGER mark_payment_for_export
  BEFORE INSERT ON payment_transactions
  FOR EACH ROW EXECUTE FUNCTION mark_for_spreadsheet_export();

CREATE TRIGGER mark_contact_for_export
  BEFORE INSERT ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION mark_for_spreadsheet_export();

CREATE TRIGGER mark_class_for_export
  BEFORE INSERT ON class_registrations
  FOR EACH ROW EXECUTE FUNCTION mark_for_spreadsheet_export();

-- Add indexes for better query performance
CREATE INDEX idx_bookings_user_id ON dungeon_bookings(user_id);
CREATE INDEX idx_bookings_date ON dungeon_bookings(booking_date);
CREATE INDEX idx_bookings_status ON dungeon_bookings(status);
CREATE INDEX idx_payments_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payments_status ON payment_transactions(status);
CREATE INDEX idx_payments_reference ON payment_transactions(reference_type, reference_id);
CREATE INDEX idx_classes_user_id ON class_registrations(user_id);
CREATE INDEX idx_classes_status ON class_registrations(status);
CREATE INDEX idx_contact_processed ON contact_submissions(is_processed);
CREATE INDEX idx_email_status ON email_notifications(status); 