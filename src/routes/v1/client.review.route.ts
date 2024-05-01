import express from "express";
import {
  createClientReviewController,
  getAllClientReviewController,
} from "../../controllers/client.review.controller";
import { validateReview } from "../../helpers/valid/validClient";

const router = express.Router();

router.post("/create", validateReview, createClientReviewController);
router.get("/r/more", getAllClientReviewController);

export default router;
