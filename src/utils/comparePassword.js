import bcrypt from "bcryptjs";

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export default comparePassword;
