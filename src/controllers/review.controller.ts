import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import userReviewModel from "../models/user.review.model";
import shopModel from "../models/shop.model";

//create
export const createReviewController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { description, rating, user, shop } = req.body;

    const shopToUpdate = await shopModel.findById(shop);

    if (!shopToUpdate) {
      return res.status(404).json({ success: false, msg: "Shop not found" });
    }
    const userReview = await userReviewModel.create({
      description,
      rating,
      user,
      shop,
    });
    const numOfratings = shopToUpdate.numOfratings ?? 0;

    const newNumOfRatings = numOfratings + 1;
    const newTotalRatings = (shopToUpdate.ratings ?? 0) * numOfratings + rating;
    const newAverageRating = newNumOfRatings
      ? newTotalRatings / newNumOfRatings
      : 0;

    const updatedShop = await shopModel.findByIdAndUpdate(
      shop,
      {
        $push: { reviews: userReview._id },
        $set: { ratings: newAverageRating, numOfratings: newNumOfRatings },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "User review created successfully",
      userReview,
      updatedShop,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//get all

export const getAllUserReviewController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const getReviews = await userReviewModel.find();

    return res.status(201).json({
      success: true,
      msg: "All users reviews",
      getReviews,
    });
  }
);

//get review by Id

export const getUserReviewByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const getUserReview = await userReviewModel.findById(id);
    return res.status(201).json({
      success: true,
      msg: "User Review",
      getUserReview,
    });
  }
);
