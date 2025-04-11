import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'arpitsb408@gmail.com',    
      pass: 'hewsbgwdrlxeemzm' 
    }
  });


  export const sendDetails = async (email, username, password) => {
    try {
      const mailOptions = {
        from: 'Election Portal <arpitsb408@gmail.com>',
        to: email,
        subject: 'Your Organization Account Credentials',
        text: `Username: ${username}\nPassword: ${password}`,
        html: `
          <h2>Welcome to The Election Conducting Portal</h2>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>You can change your username and password after login as you like .</p>
        `
      };
  
      // Step 3: Send email
      await transport.sendMail(mailOptions);
      console.log(`Credentials sent to ${email}`);
    }
     catch (error) {
      console.error('Email failed:', error);
    }
  };