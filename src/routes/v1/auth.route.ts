import express from "express";
import { validLogin, validSign } from "../../helpers/valid/validAuth";

import {
  activationController,
  forgotPasswordController,
  registerController,
  resetPasswordController,
  signinController,
  updatePasswordController,
} from "../../controllers/auth.controller";

const router = express.Router();

router.post("/register", validSign, registerController);

router.post("/login", validLogin, signinController);

router.post("/activation", activationController);

router.post("/update-password", updatePasswordController);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password", resetPasswordController);

export default router;
