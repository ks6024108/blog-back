import express from "express";
import { authController } from "../controllers/index.js";
import {
  changePasswordValidator,
  emailValildator,
  recoverPasswordValidator,
  signInValidator,
  signUpValidator,
  updateProfileValidator,
  verifyUserValidator,
} from "../validators/auth.js";
import validate from "../validators/validate.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", signUpValidator, validate, authController.signUp);
router.post("/signin", signInValidator, validate, authController.signin);

router.post(
  "/send-verify-email",
  emailValildator,
  validate,
  authController.verifyCode
);

router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);

router.post(
  "/forgot-password-code",
  emailValildator,
  validate,
  authController.forgotPasswordCode
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);

router.put(
  "/change-password",
  isAuth,
  changePasswordValidator,
  validate,
  authController.changePassword
); //set Authorization  header in postman

router.put(
  "/update-profile",
  isAuth,
  updateProfileValidator,
  validate,
  authController.updateProfile
);

export default router;
