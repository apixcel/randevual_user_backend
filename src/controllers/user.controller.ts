import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorhandler";
import bcrypt from "bcrypt";
import createToken from "../utils/jwtToken";
import jwt from "jsonwebtoken";
import sendMessage from "../utils/sendMessage";


export const registerController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error: any) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const user = await User.findOne({ email }).select("+password");

      if (user) {
        return next(new ErrorHandler("This email is already used!", 400));
      }

      return res.status(200).json({
        message:
          "Thanks to create an account. Please check your mail to active the account",
        status: 201,
      });
    }
  }
);

