import express from "express";
import {
  CancelSubscription,
  CreateCustomerSubscription,
  GetStripePricingPlans,
  InitializeStripePlans,
  UpgradeSubscription,
} from "../../controllers/subscription.controller";

const router = express.Router();

// router.post("/createplan", InitializeStripePlans);
router.get("/plans", GetStripePricingPlans);
router.post("/createCustomerSubsction", CreateCustomerSubscription);
router.patch("/updateCustomerSubsction", UpgradeSubscription);
router.patch("/calcelCustomerSubsction", CancelSubscription);

export default router;
