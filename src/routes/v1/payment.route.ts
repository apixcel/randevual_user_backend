import express from "express";
import {
  confirmPaymentController,
  createConectedAccount,
  createPaymentController,
} from "../../controllers/payment.controller";

import { validatePayment } from "../../helpers/valid/validPayment";
const router = express.Router();

router.post("/create", validatePayment, createPaymentController);
router.post("/create/conected", createConectedAccount);
router.post("/confirm", confirmPaymentController);
export default router;

// need to save paymentid and userid
