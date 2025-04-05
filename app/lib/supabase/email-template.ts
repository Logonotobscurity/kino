export const confirmationEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Kinkoasis</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .logo {
      color: #BB2124;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .content {
      padding: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #BB2124;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
    .social {
      margin-top: 15px;
    }
    .social a {
      display: inline-block;
      margin: 0 10px;
      color: #555;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Kinkoasis</div>
      <div>Premium Lifestyle Products</div>
    </div>
    <div class="content">
      <h2>Welcome to Kinkoasis!</h2>
      <p>Thank you for signing up. We're excited to have you join our community of lifestyle enthusiasts.</p>
      <p>Please confirm your email address by clicking the button below:</p>
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Confirm Your Email</a>
      </div>
      <p>At Kinkoasis, we offer premium lifestyle products including:</p>
      <ul>
        <li>Exclusive dungeon equipment</li>
        <li>Quality BDSM accessories</li>
        <li>Educational classes</li>
        <li>Private space reservations</li>
      </ul>
      <p>If you didn't sign up for an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>Kinkoasis Inc. | Premium Lifestyle Products</p>
      <p>This email was sent to {{ .Email }}</p>
      <div class="social">
        <a href="https://instagram.com/kinkoasis">Instagram</a> |
        <a href="https://twitter.com/kinkoasis">Twitter</a> |
        <a href="https://facebook.com/kinkoasis">Facebook</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const resetPasswordEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reset Your Kinkoasis Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .logo {
      color: #BB2124;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .content {
      padding: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #BB2124;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
    .social {
      margin-top: 15px;
    }
    .social a {
      display: inline-block;
      margin: 0 10px;
      color: #555;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Kinkoasis</div>
      <div>Premium Lifestyle Products</div>
    </div>
    <div class="content">
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password for your Kinkoasis account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center;">
        <a href="{{ .SiteURL }}/password-reset#access_token={{ .Token }}" class="button">Reset Your Password</a>
      </div>
      <p>If you didn't request this password reset, you can safely ignore this email.</p>
      <p>This password reset link will expire in 24 hours.</p>
    </div>
    <div class="footer">
      <p>Kinkoasis Inc. | Premium Lifestyle Products</p>
      <p>This email was sent to {{ .Email }}</p>
      <div class="social">
        <a href="https://instagram.com/kinkoasis">Instagram</a> |
        <a href="https://twitter.com/kinkoasis">Twitter</a> |
        <a href="https://facebook.com/kinkoasis">Facebook</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Instructions for setting up these custom email templates in Supabase:
/*
To use these custom email templates with Supabase:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Email Templates
3. For each template (Confirmation, Invitation, Magic Link, Recovery):
   - Click on the template
   - Replace the default HTML with the custom HTML above
   - Click "Save"

Note that the template variables like {{ .ConfirmationURL }} and {{ .Token }} 
are Supabase-specific variables that will be replaced with actual values when
sending the emails.
*/ 