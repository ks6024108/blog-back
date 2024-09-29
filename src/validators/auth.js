import { check } from "express-validator";

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

export {
  signUpValidator,
  signInValidator,
  emailValildator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
};
