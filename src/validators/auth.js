import { check } from "express-validator";
import validateEmail from "./validateEmail.js";

const signUpValidator = [
  check("name").notEmpty().withMessage("Name is Required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is Required"),
];

const signInValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is Required"),
];

const emailValildator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("Email is required"),
];

const verifyUserValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("code is required"),
];

const recoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("code is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is Required"),
];

const changePasswordValidator = [
  check("oldPassword")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("old password is Required"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("new password is Required"),
];

const updateProfileValidator = [
  check("email").custom(async (email) => {
    if (email) {
      const isValidEmail = validateEmail();
      if (!isValidEmail) {
        throw "Inavalid email";
      }
    }
  }),
];

export {
  signUpValidator,
  signInValidator,
  emailValildator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
};
