import { eachMonthOfInterval, format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import bookingModel from "../models/booking.model";
import shopModel from "../models/shop.model";

export const getShopEarningController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const shopId = req.params.id;
    const { payment } = req.query;
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      let find: { [key: string]: any } = {
        shop_id: shopId,
        status: 1,
      };

      if (payment) {
        find.payment = payment;
      }

      const bookings = await bookingModel.find(find);

      let totalEarnings = 0;

      bookings.forEach((booking) => {
        totalEarnings += booking.total;
      });

      return res.status(201).json({
        success: true,
        msg: "earning has been retrieved successfully.",
        totalEarnings,
      });
    }
  }
);

export const CreateShopEarningStatsController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const shopId = req.params.id;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const currentYear = new Date().getFullYear();
        const monthsArray = eachMonthOfInterval({
          start: new Date(currentYear, 0),
          end: new Date(currentYear, 11),
        });

        const earningsData = monthsArray.map((month) => ({
          month: format(month, "MMMM"),
          totalEarnings: 0,
        }));

        const earnings = await bookingModel.aggregate([
          {
            $match: {
              shop_id: new mongoose.Types.ObjectId(shopId),
              status: 1,
              createdAt: {
                $gte: new Date(currentYear, 0, 1),
                $lt: new Date(currentYear + 1, 0, 1),
              },
            },
          },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
              totalEarnings: { $sum: "$total" },
            },
          },
        ]);

        earnings.forEach((earning) => {
          const monthIndex = earningsData.findIndex(
            (data) =>
              data.month.toLowerCase() ===
              format(new Date(earning._id), "MMMM").toLowerCase()
          );
          if (monthIndex !== -1) {
            earningsData[monthIndex].totalEarnings = earning.totalEarnings;
          }
        });

        return res.status(200).json({
          success: true,
          msg: "Earning statistics for the current year retrieved successfully.",
          earnings: earningsData,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: "Server Error",
        });
      }
    }
  }
);

export const getLastWeekState = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  console.log(user, "user");

  if (!user) {
    return res.json({
      success: false,
      message: "no user found",
      data: null,
    });
  }

  if (!user || user.user_type !== "business") {
    return res.status(403).json({
      success: false,
      message: "forbiden access",
      data: null,
    });
  }

  // find users shop
  const shop = await shopModel.findOne({ business_id: user._id });
  if (!shop) {
    return res.status(401).json({
      success: false,
      message: "no shop found",
      data: null,
    });
  }

  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );

  const result = await bookingModel.aggregate([
    // stage 1 : match
    {
      $match: {
        createdAt: {
          $gte: lastWeek,
          $lt: now,
        },
        shop_id: shop._id,
        status: 1,
      },
    },

    // stage2: group based on the day and count total amount
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        total: { $sum: "$total" },
      },
    },
  ]);

  res.json({
    success: true,
    message: "Successfully get earing data for last 1 week",
    data: result,
  });
});
