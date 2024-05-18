import express from "express";
import { createPaymentController } from "../../controllers/payment.controller";

import { validatePayment } from "../../helpers/valid/validPayment";
const router = express.Router();

router.post("/create", validatePayment, createPaymentController);

export default router;

// need to save paymentid and userid