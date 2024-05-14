import express from "express";
import {
  createBillingController,
  getBillingController,
} from "../../controllers/billing.controller";

const router = express.Router();

router.post("/add/b/c", createBillingController);
router.get("/get/b/c", getBillingController);

export default router;
