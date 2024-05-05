import nodemailer from "nodemailer";

const sendMessage = async (
  senderMail: string,
  senderPassword: string,
  receiverMail: string,
  subject: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: "mail.randevual.co",
    port: 587,
    secure: false,
    auth: {
      user: senderMail,
      pass: senderPassword,
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  const mailOptions = {
    from: senderMail,
    to: receiverMail,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};

export default sendMessage;
