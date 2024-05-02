import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorhandler";
import bcrypt from "bcrypt";
import createToken from "../utils/jwtToken";
import jwt from "jsonwebtoken";
import sendMessage from "../utils/sendMessage";

// Get Single User
export const getSingleUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// update
export const updateSingleUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }

    const updateUserData = await User.findByIdAndUpdate(
      req.params.id,
      newUserData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      updateUserData,
    });
  }
);

export const deleteSingleUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
    await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  }
);
