import express from "express";
import {
  validLogin,
  validSign,
} from "../../helpers/valid/validAuth";

import {
  activationController,
  registerController,
  signinController,
} from "../../controllers/auth.controller";

const router = express.Router();

router.post("/register", validSign, registerController);

router.post("/login", validLogin, signinController);

router.post("/activation", activationController);


export default router;
