import express from "express";
import { confirmPaymentController } from "../../controllers/payment.controller";
const stripe = require("stripe")(process.env.STRIPE_S_K);

const router = express.Router();

router.post("/confirm", confirmPaymentController);

export default router;
