const nodemailer = require("nodemailer");

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
    secure: true,
    auth: {
      user: senderMail,
      pass: senderPassword,
    },
    tls: {
      rejectUnauthorized: false,
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
    const responseParts = info.response.split(" ");
    const statusCode = responseParts[0];
    if (statusCode === "250") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMessage;
