import express from "express";
import { createReviewController, getAllUserReviewController, getUserReviewByIdController } from "../../controllers/review.controller";
const router = express.Router();


router.post("/create", createReviewController);
router.get("/r/more", getAllUserReviewController);
router.get("/r/:id", getUserReviewByIdController);

export default router;