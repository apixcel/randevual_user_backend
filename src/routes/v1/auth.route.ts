import express from "express";
import { validateLogin, validateSign } from "../../helpers/valid/validAuth";

import {
  activationController,
  checkEmailController,
  forgotPasswordController,
  registerCustomerController,
  resetPasswordController,
  signinController,
} from "../../controllers/auth.controller";
const router = express.Router();

router.post("/u/exist", checkEmailController);
router.post("/register", registerCustomerController);

// router.post("/login", signinController);
router.post("/register", validateSign, registerCustomerController);

router.post("/login", validateLogin, signinController);

router.post("/activation", activationController);

router.put("/forgotpassword", forgotPasswordController);

router.put("/resetpassword", resetPasswordController);

export default router;
