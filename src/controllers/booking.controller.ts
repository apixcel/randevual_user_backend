import { NextFunction, Request, Response } from "express";
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

export const getAllBookingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await bookingModel.find();
      return res.status(201).json({
        success: true,
        msg: "All Booking controller",
        booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Something went wrong",
        error,
      });
    }
  }
);


export const getBookingByIdController = catchAsyncErrors(
async(req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
const data = await bookingModel.findById(id)
return res.status(201).json({
success: true,
msg: "Single user booking",
data
})


}
)