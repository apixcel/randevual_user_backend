import express from "express";
import { createBookingController } from "../../controllers/booking.controller";

const router = express.Router();

router.post("/create", createBookingController);

export default router;
