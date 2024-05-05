import express from "express";
import {
  activationController,
  forgotPasswordController,
  registerCustomerController,
  resetPasswordController,
  signinController,
} from "../../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerCustomerController);

router.post("/login", signinController);

router.post("/activation", activationController);

router.put("/forgotpassword", forgotPasswordController);

router.put("/resetpassword", resetPasswordController);

export default router;
