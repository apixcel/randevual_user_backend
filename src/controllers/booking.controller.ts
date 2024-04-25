import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import bookingModel from "../models/booking.model";


export const createBookingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...bookingData } = req.body;
      const booking = await bookingModel.create(bookingData);
      return res.status(201).json({
        success: true,
        msg: "Booking has been created successfully.",
        booking,
      });
    }
  }
);
