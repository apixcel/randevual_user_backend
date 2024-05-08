import express from "express";
import {
  createBookingController,
  getAllBookingController,
  getBookingByIdController,
  getBookingByShopIdController,
} from "../../controllers/booking.controller";
import { validateBooking } from "../../helpers/valid/validBooking";

const router = express.Router();

router.post("/create", validateBooking, createBookingController);
router.get("/s/more", getAllBookingController);
router.get("/s/:id", getBookingByIdController);
router.get("/s/shop/:id", getBookingByShopIdController);

export default router;
