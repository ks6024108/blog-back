import { User } from "../models/index.js";
import comparePassword from "../utils/comparePassword.js";
import generateCode from "../utils/generateCode.js";
import generateToken from "../utils/generateToken.js";
import hashedPassword from "../utils/hashedPassword.js";
import sendEmail from "../utils/sendEmail.js";
const signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exist");
    }

    const hashPassword = await hashedPassword(password);

    const newUser = new User({ name, email, password: hashPassword, role });

    await newUser.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "user registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("invalid credentials");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("invalid credentials");
    }

    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: true,
      message: "user signin successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("user is already verified");
    }
    const code = generateCode(6);
    user.verificationCode = code;
    await user.save();

    //send email
    await sendEmail({
      emailTo: user.email,
      subject: "email verification code",
      code,
      content: "verify your account",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "user verification code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("invalid code");
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res
      .status(200)
      .json({ code: 200, status: true, message: "user verified successfully" });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "forgot password code",
      code,
      content: "change your password",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "forgot password code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    if (user.forgotPasswordCode !== code) {
      res.code = 400;
      throw new Error("invalid code");
    }
    const hashPassword = await hashedPassword(password);
    user.password = hashPassword;
    user.forgotPasswordCode = null;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "password recover successfully",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    const user = User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    const match = await comparePassword(oldPassword.user.password);
    if (!match) {
      res.code = 400;
      throw new Error("old password does not match");
    }

    if (oldPassword === newPassword) {
      res.code = 400;
      throw new Error("you are providing old password");
    }

    const hashedPassword = hashedPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const _id = req.user;
    const { name, email } = req.body;
    const user = await User.findById(_id).select(
      "-password -verificationCode -forgotPasswordCode"
    );
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }

    if (email) {
      const isUserExist = await User.findOne({ email });
      if (
        isUserExist &&
        isUserExist.email === email &&
        String(user._id) !== String(isUserExist._id)
      ) {
        res.code = 400;
        throw new Error("Email already exist");
      }
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    if (email) {
      user.isVerified = false;
    }

    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "user profile updated successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signUp,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile,
};
