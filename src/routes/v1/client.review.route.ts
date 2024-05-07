import express from "express";
import {
  createReviewController,
  getAllUserReviewController,
} from "../../controllers/review.controller";
import { validateReview } from "../../helpers/valid/validClient";

const router = express.Router();

router.post("/create", validateReview, createReviewController);
router.get("/r/more", getAllUserReviewController);

export default router;
