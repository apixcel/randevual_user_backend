import express from "express";
import { createReviewController, getAllUserReviewController, getUserReviewByIdController } from "../../controllers/review.controller";
const router = express.Router();


router.post("/user", createReviewController);
router.get("/user", getAllUserReviewController);
router.get("/user/:id", getUserReviewByIdController);

export default router;