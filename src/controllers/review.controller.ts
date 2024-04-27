import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import userReviewModel from "../models/user.review.model";

//create
export const createReviewController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
        const {...reviewData} = req.body
        const userReview = await userReviewModel.create(reviewData);
        return res.status(201).json({
            success: true,
            msg: "user review created successfully",
            userReview,
        })

    }
  }
);

//get all

export const getAllUserReviewController = catchAsyncError(
    async(req:Request, res: Response, next: NextFunction) => {
        const getReviews = await userReviewModel.find();

        return res.status(201).json({
            success: true,
            msg: "All users reviews",
            getReviews
        })
    }
)

//get review by Id

export const getUserReviewByIdController = catchAsyncError(
    async(req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const getUserReview = await userReviewModel.findById(id);
        return res.status(201).json({
            success: true,
            msg: "User Review",
            getUserReview
        })
    }
)

