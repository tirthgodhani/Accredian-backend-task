import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendReferralEmail = async ({ to, referrerName, refereeName, courseId }) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: `${referrerName} has referred you to a course!`,
    html: `
      <h1>Course Referral</h1>
      <p>Hello ${refereeName},</p>
      <p>${referrerName} thinks you might be interested in our course (ID: ${courseId}).</p>
      <p>Click the link below to learn more:</p>
      <a href="${process.env.FRONTEND_URL}/courses/${courseId}">View Course</a>
      <p>Best regards,<br>The Team</p>
    `
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send referral email');
  }
};
