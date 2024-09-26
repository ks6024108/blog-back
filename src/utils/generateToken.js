import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export default generateToken;
