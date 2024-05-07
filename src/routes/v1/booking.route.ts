import express from "express";
import {
  createBookingController,
  getAllBookingController,
  getBookingByIdController,
} from "../../controllers/booking.controller";
import { validateBooking } from "../../helpers/valid/validBooking";

const router = express.Router();

router.post("/create", validateBooking, createBookingController);
router.get("/s/more", getAllBookingController);
router.get("/s/:id", getBookingByIdController);

export default router;
