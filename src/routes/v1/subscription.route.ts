import express from "express";
import {
  CancelSubscription,
  CreateCustomerSubscription,
  GetStripePricingPlans,
  UpgradeSubscription,
  getShopOwnerSubscription,
} from "../../controllers/subscription.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();

// router.post("/createplan", InitializeStripePlans);
router.get("/plans", GetStripePricingPlans);
router.get("/shop/plan", isAuthenticatedUser, getShopOwnerSubscription);
router.post("/createCustomerSubsction", CreateCustomerSubscription);
router.patch("/updateCustomerSubsction", UpgradeSubscription);
router.patch("/calcelCustomerSubsction", CancelSubscription);

export default router;
