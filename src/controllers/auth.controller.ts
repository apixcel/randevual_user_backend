import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorhandler";
import userModel from "../models/user.model";
import createToken from "../utils/jwtToken";
import sendMessage from "../utils/sendMessage";

// Register Account
export const registerCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstname, lastname, password, phone } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      throw new ErrorHandler("This email is already used!", 400);
    }
    const user = await userModel.create({
      email,
      firstname,
      lastname,
      password,
      phone,
    });
    const token = createToken(user, "7d");

    return res.json({
      success: true,
      message: "Signin success",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Activation by Verify Email
export const activationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.json({ message: "Error: Token missing." });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
 
    return res.json({
      success: true,
      message: "Signup success",
      token: ""
    });
  } catch (error) {
    next(error);
  }
};

// Login Account
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    return res.json({
      success: true,
      message: "Signin success"
    });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ErrorHandler("User with that email does not exist", 400);
    }

  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    return res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
