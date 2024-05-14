import express from "express";
import {
  addSubscriber,
  getSubscribers,
} from "../../controllers/subscribe.Controller";

const router = express.Router();
router.post("/add/sub/r", addSubscriber);
router.get("/get/sub/r", getSubscribers);

export default router;
