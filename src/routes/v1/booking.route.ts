import express from "express";
import { createBookingController, getAllBookingController } from "../../controllers/booking.controller";

const router = express.Router();

router.post("/create", createBookingController);
router.get("/s/more", getAllBookingController);

export default router;
