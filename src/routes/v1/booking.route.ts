import express from "express";
import { createBookingController, getAllBookingController, getBookingByIdController } from "../../controllers/booking.controller";

const router = express.Router();

router.post("/create", createBookingController);
router.get("/s/more", getAllBookingController);
router.get("/s/:id", getBookingByIdController);

export default router;
