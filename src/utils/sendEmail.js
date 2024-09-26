import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.senderEmail,
      pass: config.emailPassword,
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
    <div>
      <h3>use this below content to ${content}</h3>
      <p><strong>Code:</strong>${code}</p>
    </div>
    `,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
