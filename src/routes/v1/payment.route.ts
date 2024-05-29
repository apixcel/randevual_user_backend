import express from "express";
import {
  confirmCashPaymentController,
  confirmPaymentController,
  createConnectedAccount,
  createPaymentController,
} from "../../controllers/payment.controller";

const stripe = require("stripe")(process.env.STRIPE_S_K);

import { validatePayment } from "../../helpers/valid/validPayment";
const router = express.Router();

router.post("/create", validatePayment, createPaymentController);
router.post("/create/conected", createConnectedAccount);
// confirm card payment
router.post("/confirm/card", confirmPaymentController);
// confirm cash payments
router.post("/confirm/cash", confirmCashPaymentController);
router.get("/test", async (req, res) => {
  const capability = await stripe.accounts.retrieveCapability(
    "acct_1PLgEHFyldV8pV0Q",
    "card_payments"
  );
  res.send({ capability });
});
export default router;

// need to save paymentid and userid
