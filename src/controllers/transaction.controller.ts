import catchAsyncError from "../middlewares/catchAsyncErrors";
import shopModel from "../models/shop.model";
import transactionModel from "../models/transaction.model";

// business withdraw money
export const getTotalTransaction = catchAsyncError(async (req, res, next) => {
  // const userId = "664486de398ef34320e2f4f1";
  const userId = req.user?._id;

  const shop = await shopModel.findOne({ business_id: userId }, { _id: 1 });
  if (!shop) {
    return res.status(400).send({
      success: false,
      message: "No shop found for this user",
      data: null,
    });
  }

  const result = await transactionModel.aggregate([
    {
      $match: { shopId: shop._id },
    },
    {
      $group: { _id: null, totalAmmount: { $sum: "$amount" } },
    },
  ]);

  res.json({
    success: false,
    message: "successfully get total ammount",
    data: result[0],
  });
});

export const getAllTransaction = catchAsyncError(async (req, res) => {
  const { page, limit = 10 } = req.query;

  const pageNumber = page ? parseInt(page as string, 10) : 0;
  const limitNumber = limit ? parseInt(limit as string, 10) : 0;
  const skip = (pageNumber - 1) * limitNumber;

  const userId = req.user?._id;
  const shop = await shopModel.findOne({ business_id: userId }, { _id: 1 });

  if (!shop) {
    return res.status(400).send({
      success: false,
      message: "No shop found for this user",
      data: null,
    });
  }

  let result = transactionModel.find({ shopId: shop._id });

  if (pageNumber) {
    result = result.skip(skip).limit(limitNumber);
  }

  const transactions = await result;

  const totalDocument = await transactionModel.countDocuments({
    shopId: shop._id,
  });

  res.send({
    success: true,
    data: { result: transactions, totalDoc: totalDocument },
    message: "Successfully get transaction history",
  });
});
