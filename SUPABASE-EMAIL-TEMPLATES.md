# Customizing Email Templates in Supabase for Kinkoasis

This guide explains how to customize the email templates sent by Supabase Authentication for Kinkoasis branding and content.

## Why the Default Emails Don't Show Kinkoasis Branding

By default, Supabase sends plain, generic authentication emails. The reason you don't see Kinkoasis branding in confirmation emails is because Supabase needs to be configured to use our custom email templates.

## Email Templates Location

We have created custom HTML email templates with Kinkoasis branding in:
- `app/lib/supabase/email-template.ts`

This file contains templates for:
- Confirmation emails (when users sign up)
- Password reset emails

## How to Set Up Custom Email Templates in Supabase

1. **Log in to your Supabase Dashboard**
   - Go to [https://app.supabase.com/](https://app.supabase.com/)
   - Select your Kinkoasis project

2. **Navigate to Authentication Settings**
   - From the left sidebar, click on "Authentication"
   - Then click on "Email Templates"

3. **Customize the Confirmation Email**
   - Click on the "Confirmation" template
   - Replace the default HTML with our custom confirmation email HTML from `app/lib/supabase/email-template.ts`
   - Make sure to keep all the template variables like `{{ .ConfirmationURL }}` intact
   - Click "Save"

4. **Customize the Password Reset Email**
   - Click on the "Recovery" template
   - Replace the default HTML with our custom reset password HTML from `app/lib/supabase/email-template.ts`
   - Make sure to keep all the template variables like `{{ .Token }}` intact
   - Click "Save"

5. **Test the Templates**
   - You can use the "Send test email" button in Supabase to verify how they look

## Template Variables

Supabase uses Go templating language with variables like:

- `{{ .Email }}` - The recipient's email address
- `{{ .ConfirmationURL }}` - The URL to confirm email registration
- `{{ .Token }}` - The token for password reset links
- `{{ .SiteURL }}` - Your website URL as configured in Supabase

## Troubleshooting

If your custom emails aren't being sent correctly:

1. **Check Template Syntax**
   - Ensure all template variables are present and correctly formatted
   - Validate your HTML for any errors

2. **Email Provider Limits**
   - Be aware that Supabase has email sending limits
   - For high-volume scenarios, consider setting up a custom SMTP provider

3. **Spam Filters**
   - Some custom styling might trigger spam filters
   - If emails aren't being received, check spam folders and consider simplifying your HTML

## Support

For any issues with the email templates, contact your Supabase administrator or check the [Supabase documentation](https://supabase.com/docs/guides/auth/auth-email-templates). 