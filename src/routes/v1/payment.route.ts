import express from "express";
import {
  confirmCashPaymentController,
  confirmPaymentController,
  createConectedAccount,
  createPaymentController,
} from "../../controllers/payment.controller";

import { validatePayment } from "../../helpers/valid/validPayment";
const router = express.Router();

router.post("/create", validatePayment, createPaymentController);
router.post("/create/conected", createConectedAccount);
// confirm card payment
router.post("/confirm/card", confirmPaymentController);
// confirm cash payments
router.post("/confirm/cash", confirmCashPaymentController);
export default router;

// need to save paymentid and userid
