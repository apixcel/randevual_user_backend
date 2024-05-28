import mongoose from "mongoose";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import transactionModel from "../models/transaction.model";

// business withdraw money
export const getTransactionByPaymentMethod = catchAsyncError(
  async (req, res, next) => {
    // const userId = "664486de398ef34320e2f4f1";
    const userId = req.user?._id;
    console.log(userId);

    const result = await transactionModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId as string) },
      },
      {
        $group: { _id: "$payment", totalAmmount: { $sum: "$amount" } },
      },
    ]);

    res.json({
      success: false,
      message: "successfully get withdraw earning history",
      data: result,
    });
  }
);
