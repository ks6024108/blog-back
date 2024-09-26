import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  senderEmail: process.env.SENDER_EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export const config = Object.freeze(_config);
