import express from "express";
import {
  createReviewController,
  getAllUserReviewController,
  getUserReviewByIdController,
} from "../../controllers/review.controller";
import { validateReview } from "../../helpers/valid/validClient";
const router = express.Router();

router.post("/r/create", validateReview, createReviewController);
router.get("/r/more", getAllUserReviewController);
router.get("/r/:id", getUserReviewByIdController);

export default router;
