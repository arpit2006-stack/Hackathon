// utils/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendStatusUpdateEmail = (candidate, status) => {
  const { email, name, post } = candidate;
  
  const statusColor = status === 'Approved' ? '#065f46' : '#dc2626';
  const statusMessage = status === 'Approved' 
    ? `Congratulations! Your application for ${post} has been approved.`
    : `We regret to inform you that your application for ${post} has not been approved at this time.`;

  const mailOptions = {
    from: `Election Committee <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Application Update: ${post}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          <h1 style="color: #1e293b; margin: 0;">Election System</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #1e293b;">Dear ${name},</h2>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: ${statusColor}; margin-top: 0;">Status: ${status}</h3>
            <p style="margin-bottom: 0;">${statusMessage}</p>
          </div>
          
          <p>Position: <strong>${post}</strong></p>
          
          ${status === 'Approved' ? `
            <div style="margin: 25px 0; padding: 15px; background: #ecfdf5; border-radius: 6px; border-left: 4px solid #10b981;">
              <h4 style="margin-top: 0; color: #065f46;">Next Steps</h4>
              <p>Now just hope for the best . All the best from our side</p>
            </div>
          ` : ''}
          
          <p style="color: #64748b;">If you have any questions, please contact the election committee.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 15px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
          <p>This is an automated message. Please do not reply.</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export default transporter;