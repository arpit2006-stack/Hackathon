// utils/emailSender.js
import nodemailer from 'nodemailer';

// Temporary OTP storage (replace with database in production)
const otpStorage = {};

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendVerificationOTP = async (email) => {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 300000; // 5 minutes

    // Store OTP
    otpStorage[email] = { otp, expiresAt };

    await transport.sendMail({
      from: 'Election Portal arpitsb408@gmail.com',
      to: email,
      subject: 'Email Verification OTP',
      html: `
        <div>
          <h2>Your Verification Code</h2>
          <p>Use this OTP to verify your email:</p>
          <h3>${otp}</h3>
          <p>Valid for 5 minutes</p>
        </div>
      `,
      text: `Your OTP is: ${otp} (Valid for 5 minutes)`
    });

    console.log('OTP sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

export const verifyOTP = (email, userOTP) => {
  const storedData = otpStorage[email];
  
  if (!storedData) {
    throw new Error('OTP not found');
  }

  if (Date.now() > storedData.expiresAt) {
    delete otpStorage[email];
    throw new Error('OTP expired');
  }

  if (storedData.otp !== parseInt(userOTP)) {
    throw new Error('Invalid OTP');
  }

  delete otpStorage[email];
  return true;
};