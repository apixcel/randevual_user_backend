import express from "express";
import { validLogin, validSign } from "../../helpers/valid/validAuth";

import {
  activationController,
} from "../../controllers/user.controller";

const router = express.Router();

router.post("/register",validLogin);

router.post("/login");

router.post("/activation");

router.post("/update-password");

router.post("/forgot-password");

router.post("/reset-password");

export default router;
