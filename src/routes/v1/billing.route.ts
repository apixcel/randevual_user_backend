import express from "express";
import {
  createBillingController,
  updateBillingController,
} from "../../controllers/billing.controller";

const router = express.Router();

router.post("/add/b/c", createBillingController);

router.post("/b/update", updateBillingController);

export default router;

// need to save paymentid and userid
