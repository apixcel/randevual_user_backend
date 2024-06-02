import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import bookingModel from "../models/booking.model";

import transactionModel from "../models/transaction.model";

export const confirmPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const booking = await bookingModel.findOne({ _id: body.bookingId });
    if (!booking) {
      return res.send({
        success: false,
        message: "Booking not found",
        data: null,
      });
    }

    if (booking.payment !== "cash") {
      return res.status(400).json({
        success: false,
        message: "Booking is not in cash",
        data: null,
      });
    }

    // create cash payment
    const result = await transactionModel.create(body);
    // update booking status
    await bookingModel.findByIdAndUpdate(body.bookingId, { status: 1 });
    res.status(200).json({
      success: true,
      message: "Payment confirm",
      data: result,
    });
  }
);
