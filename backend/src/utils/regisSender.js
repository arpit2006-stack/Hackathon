import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendRegistrationEmail = (toEmail, name, registrationId) => {
  const mailOptions = {
    from: 'Election System <elections@example.com>',
    to: toEmail,
    subject: 'Your Candidate Registration ID',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #1a365d;">Candidate Registration Confirmation</h2>
        <p>Hello ${name},</p>
        <p>Your candidate registration was successful!</p>
        
        <div style="background: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin: 0;">Registration ID:</h3>
          <div style="font-size: 24px; color: #2b6cb0; font-weight: bold;">
            ${registrationId}
          </div>
        </div>

        <p style="color: #4a5568;">
          Keep this ID safe for future reference. You'll need it to:
          <ul style="color: #4a5568;">
            <li>Check your nomination status</li>
            <li>Access election results</li>
            <li>Update your profile</li>
          </ul>
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};