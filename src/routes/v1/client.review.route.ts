import express from "express";
import { createClientReviewController, getAllClientReviewController } from "../../controllers/client.review.controller";


const router = express.Router();

router.post("/create", createClientReviewController);
router.get("/r/more", getAllClientReviewController);


export default router