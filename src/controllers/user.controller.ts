import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorhandler";

// get single use by token
export const getAuthor = catchAsyncErrors(
  async (req: any, res: Response, next: NextFunction) => {
    const { userInfo } = req;

    const user = await User.findById(userInfo._id).select("-password");

    if (!user)
      return next(
        new ErrorHandler(`User does not exist with Id: ${userInfo._id}`, 400)
      );

    res.status(200).json({
      success: true,
      user,
    });
  }
);

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
    const id = req.user?._id

    if (!id) {
      return next(
        new ErrorHandler(`User does not exist`, 400)
      );
    }

    const updateUserData = await User.findByIdAndUpdate(
      id,
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
