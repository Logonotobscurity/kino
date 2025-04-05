# Kinkoasis - Enhanced User Profiles & Community Features

This repository contains the implementation of enhanced user profiles with membership plans, payment management, and a community platform for the Kinkoasis web application.

## New Features

### Enhanced User Profiles
- **Profile Information**: Users can update their personal details, including username, full name, and bio
- **Membership Plans**: Three-tiered membership system (Standard, Premium, VIP) with different benefits and pricing
- **Payment Management**: Ability to add, update, and manage payment methods

### Community Platform
- **Discussion Forums**: Threaded discussions organized by categories
- **Events**: Upcoming events with details about location, time, and membership requirements
- **Member Directory**: Browse and connect with other community members
- **Community Levels**: Progression system based on participation and engagement

## Database Updates

The following changes have been made to the database schema:

```sql
-- Add bio field
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add membership fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_tier TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_expiry TIMESTAMP WITH TIME ZONE;

-- Add community fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_joined BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_join_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_level TEXT DEFAULT 'newcomer';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_badges JSONB DEFAULT '[]'::JSONB;
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Supabase connection in `.env.local`
4. Run the SQL in `sql/alter_profiles_table.sql` to update your database schema
5. Start the development server: `npm run dev`

## Pages

- User Profile: `/auth/profile`
- Community: `/community`

## Implementation Details

The enhanced user profile includes:
- Profile information management
- Membership plan selection and management
- Payment method management with card adding functionality
- Direct link to join the community

The community page includes:
- Discussion forums with topic listings
- Events calendar with filtering by membership tier
- Member directory with community level badges
- Community level progression system

## Technologies Used

- Next.js 14
- Supabase for authentication and database
- Shadcn UI components
- TypeScript 

# Kinkoasis Forms, Bookings, and Payment System

This document explains the database schema, email service, and spreadsheet export functionality for the Kinkoasis application.

## Database Schema

The SQL schema in `sql/booking_and_payment_schema.sql` implements tables for:

- **Contact Submissions**: Stores contact form submissions
- **Dungeon Bookings**: Manages reservation data for dungeon rentals
- **Class Registrations**: Tracks class and workshop sign-ups
- **Payment Methods**: Stores customer payment information
- **Payment Transactions**: Records payment history
- **Email Notifications**: Logs all emails sent through the system
- **Spreadsheet Exports**: Tracks exports to Google Sheets

All tables include Row Level Security (RLS) policies to ensure data privacy, with users only able to access their own data while administrators can access all records.

## Email Notifications

The email service (`app/lib/api/email-service.ts`) provides functionality to send notifications for:

1. **Contact Form Submissions**:
   - Confirmation emails to users who submit contact forms
   - Notifications to administrators about new submissions

2. **Bookings**:
   - Confirmation emails for dungeon bookings
   - Booking notifications to administrators

3. **Payments**:
   - Payment receipts to customers
   - Transaction notifications to administrators

4. **Class Registrations**:
   - Registration confirmations to attendees
   - Class enrollment notifications to administrators

The email service is set up to store all communications in the database and can be integrated with providers like SendGrid or Mailgun for actual delivery.

## Google Sheets Integration

The spreadsheet export functionality (`app/lib/api/sheet-export.ts`) enables automatic data export to Google Sheets:

1. **Configuration**: 
   - Requires Google API credentials in the environment variables
   - Uses designated spreadsheet IDs for each data type

2. **Export Functions**:
   - `exportContactSubmissionsToSheet()`: Exports contact form data
   - `exportBookingsToSheet()`: Exports dungeon booking data
   - `exportPaymentsToSheet()`: Exports payment transaction data
   - `exportClassRegistrationsToSheet()`: Exports class registration data

3. **Automated Exports**:
   - A cron job endpoint (`app/api/cron/spreadsheet-export/route.ts`) enables scheduled exports
   - Can be triggered via Vercel Cron Jobs or external scheduling services

## Setup Instructions

1. **Database Setup**:
   ```bash
   # Run the SQL schema file against your Supabase project
   psql -h your-supabase-host -d postgres -U postgres -f sql/booking_and_payment_schema.sql
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in the required values:
   ```bash
   cp .env.example .env.local
   ```

3. **Google Sheets Setup**:
   - Create a Google Cloud Project
   - Enable the Google Sheets API
   - Create a service account with appropriate permissions
   - Share your Google Sheets with the service account email
   - Add the service account credentials to your environment variables

4. **Email Provider Setup** (optional):
   - Sign up for an email service like SendGrid or Mailgun
   - Add your API credentials to the environment variables
   - Update the email service to use your chosen provider

## Community Page Routing

The "Join Our Community" button in the header now correctly routes users to the `/community` page after they join, ensuring a seamless user experience.

## Usage

- Form submissions, bookings, and payments are automatically logged in the database
- Emails are sent for all user actions
- Data is exported to Google Sheets on a schedule
- Users can access their community page immediately after joining

## Dependencies

- `google-spreadsheet`: For Google Sheets integration
- `google-auth-library`: For Google API authentication 