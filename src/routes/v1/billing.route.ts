import express from "express";
import {
  createBillingController,
  getBillingController,
  updateBillingController,
} from "../../controllers/billing.controller";

const router = express.Router();

router.post("/add/b/c", createBillingController);

router.post("/b/update", updateBillingController);
router.get("/get/b", getBillingController);
export default router;

// need to save paymentid and userid
