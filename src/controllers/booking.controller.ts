import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import bookingModel from "../models/booking.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/errorhandler";

export const createBookingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const {
          list,
          total,
          date,
          time,
          team,
          phone,
          notes,
          visit,
          payment,
          status,
          user_id,
          shop_id,
        } = req.body;

        // if no team id
        if (team === "any" || !team) {
          const booking = await bookingModel.create({
            list,
            total,
            date,
            time,
            phone,
            notes,
            visit,
            payment,
            status,
            user_id,
            shop_id,
          });
          return res.status(201).json({
            success: true,
            msg: "Booking has been created successfully.",
            booking,
          });
        }

        const booking = await bookingModel.create({
          team,
          list,
          total,
          date,
          time,
          phone,
          notes,
          visit,
          payment,
          status,
          user_id,
          shop_id,
        });

        return res.status(201).json({
          success: true,
          msg: "Booking has been created successfully.",
          booking,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export const getAllBookingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const shop_id = req.params.id;
    const { query } = req.query;

    try {
      let user;
      if (query) {
        user = await userModel.find({
          $or: [
            { firstname: { $regex: query || "", $options: "i" } },
            { lastname: { $regex: query || "", $options: "i" } },
            { email: query },
          ],
        });

        if (!user) {
          return res.send({
            success: false,
            data: [],
            message: "no user found",
          });
        }
        const userIds = user.map((u) => u._id);
        const booking = await bookingModel
          .find({ shop_id, user_id: { $in: userIds } })
          .populate("shop_id")
          .populate("user_id");

        return res.status(201).json({
          success: true,
          msg: "All Booking controller",
          booking,
        });
      }

      const booking = await bookingModel
        .find({ shop_id })
        .populate("shop_id")
        .populate("user_id");
      return res.status(201).json({
        success: true,
        msg: "All Booking controller",
        booking,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        msg: "Something went wrong",
        error,
      });
    }
  }
);

export const getBookingByIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await bookingModel.findById(id);
    return res.status(201).json({
      success: true,
      msg: "Single user booking",
      data,
    });
  }
);

export const getBookingByShopIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const shop_id = req.params.id;
    const { date } = req.query;
    let find: { [key: string]: any } = {
      shop_id,
    };

    if (date) {
      const startOfToday = new Date(date as string);
      startOfToday.setUTCHours(0, 0, 0, 0);
      const startOfTodayStr = startOfToday.toISOString();

      // Get the start of tomorrow as a string
      const startOfTomorrow = new Date(startOfToday);
      startOfTomorrow.setUTCDate(startOfTomorrow.getUTCDate() + 1);
      const startOfTomorrowStr = startOfTomorrow.toISOString();
      find.date = { $gte: startOfTodayStr, $lt: startOfTomorrowStr };
    }
    // const data = await bookingModel.find(find).populate("user_id");
    // const data = await bookingModel.aggregate([
    //   {
    //     $match: {
    //       shop_id: new ObjectId(shop_id),
    //     },
    //   },
    // ]);

    const data = await bookingModel
      .find(find)
      .populate("user_id")
      .populate("shop_id");
    return res.status(201).json({
      success: true,
      msg: "Single shop bookings",
      data,
    });
  }
);

// get user id based booking
export const getUserBookingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id;

    const { filterType } = req.query;
    let filter: { [key: string]: any } = {
      user_id,
    };

    if (filterType === "upcoming") {
      filter.status = 0;
    }
    if (filterType === "previous") {
      filter.status = 1;
    }
    if (filterType === "cancel") {
      filter.status = 2;
    }

    const data = await bookingModel
      .find(filter)
      .populate("shop_id")
      .populate("user_id");
    // const data = await bookingModel.find(filter).populate("shop_id");

    return res.status(201).json({
      success: true,
      msg: "single User bookings",
      data,
    });
  }
);

// get shop booking state(all type booking count)
export const getBookingCounter = catchAsyncErrors(async (req, res, next) => {
  const { shopId } = req.params;
  const result = await bookingModel.aggregate([
    // stage-1
    {
      $match: { shop_id: new mongoose.Types.ObjectId(shopId) },
    },

    // groupe based on status
    {
      $group: { _id: "$status", total: { $sum: 1 } },
    },
  ]);

  res.send({
    success: true,
    message: "Successfully get booking state count",
    data: result,
  });
});

export const deleteBookingByIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = req.user;
    if (!user) {
      return;
    }

    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "Booking not found",
        data: null,
      });
    }
    if (booking.user_id.toString() !== user._id) {
      return res.status(401).json({
        success: false,
        message: "Forbiden access",
        data: null,
      });
    }
    const deleteBooking = await bookingModel.findByIdAndDelete(id);

    return res.status(201).json({
      success: true,
      msg: "Booking deleted successfully",
      deleteBooking,
    });
  }
);

export const cancelSingleBooking = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // const newBoookingData = req.body;
    const id = req.user?._id;
    const shop_id = req.params.id;

    console.log("========== patch", shop_id);

    if (!id) {
      return next(new ErrorHandler(`User does not exist`, 400));
    }

    // console.log("update data", newBoookingData);

    const updateBooking = await bookingModel.findByIdAndUpdate(
      shop_id,
      { status: 2 },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    console.log("update", updateBooking);

    res.status(200).json({
      success: true,
      updateBooking,
    });
  }
);

/*
booking only logged shop
*/
