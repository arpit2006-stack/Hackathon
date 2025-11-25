import nodemailer from 'nodemailer'

// Configure transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your email (e.g., myapp@gmail.com)
    pass: process.env.GMAIL_APP_PASSWORD, // App password (not your Gmail password)
  },
});

// Email sending function
const sendInquiryConfirmation = async (toEmail, userName) => {
  const mailOptions = {
    from: `"Your Organization" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Thank you for your inquiry!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Hello ${userName},</h2>
        <p>We've received your inquiry and will respond within 24 hours.</p>
        <p><strong>Organization Team</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendInquiryConfirmation ;