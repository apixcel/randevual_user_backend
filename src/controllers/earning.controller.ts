import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import bookingModel from "../models/booking.model";
import { startOfMonth, endOfMonth, format, eachMonthOfInterval, parse } from 'date-fns';


export const getShopEarningController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const shopId = req.params.id;

    console.log("shopid", shopId);
    

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const bookings = await bookingModel.find({
        shop_id: shopId,
        status: 1,
      });

      
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
          month: format(month, 'MMMM'),
          totalEarnings: 0,
        }));

        const earnings = await bookingModel.aggregate([
          {
            $match: {
              shop_id: shopId,
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
            (data) => data.month.toLowerCase() === format(new Date(earning._id), 'MMMM').toLowerCase() 
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