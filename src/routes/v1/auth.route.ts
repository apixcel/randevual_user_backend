import express from "express";
import {
  forgotPasswordValidator,
  resetPasswordValidator,
  validLogin,
  validSign,
} from "../../helpers/valid/validAuth";

import {
  activationController,
  forgotPasswordController,
  registerController,
  resetPasswordController,
  signinController,
} from "../../controllers/auth.controller";

const router = express.Router();

router.post("/register", validSign, registerController);

router.post("/login", validLogin, signinController);

router.post("/activation", activationController);

router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

export default router;
