import express from "express";
import {
  cancelSingleBooking,
  createBookingController,
  deleteBookingByIdController,
  getAllBookingController,
  getBookingByIdController,
  getBookingByShopIdController,
  getUserBookingController,
} from "../../controllers/booking.controller";
import { validateBooking } from "../../helpers/valid/validBooking";
import { isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();

router.post("/create", validateBooking, createBookingController);
router.get("/s/more/:id", getAllBookingController);
router.get("/s/:id", getBookingByIdController);
router.get("/s/shop/:id", getBookingByShopIdController);
router.get("/u/bookings/:id", getUserBookingController);
router.delete("/b/delete/:id", deleteBookingByIdController);
router.patch("/b/update/:id",isAuthenticatedUser, cancelSingleBooking);

export default router;
