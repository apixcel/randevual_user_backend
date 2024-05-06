import express from "express";
import { createPaymentController } from "../../controllers/payment.controller";

const router = express.Router();

router.post("/create", createPaymentController);

export default router;

// need to save paymentid and userid