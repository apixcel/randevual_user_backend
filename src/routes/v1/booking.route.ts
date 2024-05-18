import express from "express";
import {
  createBookingController,
  deleteBookingByIdController,
  getAllBookingController,
  getBookingByIdController,
  getBookingByShopIdController,
  getUserBookingController,
} from "../../controllers/booking.controller";
import { validateBooking } from "../../helpers/valid/validBooking";

const router = express.Router();

router.post("/create", validateBooking, createBookingController);
router.get("/s/more/:id", getAllBookingController);
router.get("/s/:id", getBookingByIdController);
router.get("/s/shop/:id", getBookingByShopIdController);
router.get("/u/bookings/:id", getUserBookingController);
router.delete("/b/delete/:id", deleteBookingByIdController);

export default router;
