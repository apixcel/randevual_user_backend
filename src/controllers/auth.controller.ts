import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/errorhandler";
import createToken from "../utils/jwtToken";
import shopModel from "../models/shop.model";

// Register Account
export const checkEmailController = async (
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
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.json({
        success: true,
        exist: true,
        message: "Email checked",
      });
    }

    return res.json({
      success: true,
      exist: false,
      message: "Email checked",
    });
  } catch (error) {
    next(error);
  }
};

// Register customer Account
export const registerCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstname, lastname, password, phone } = req.body;
    const errors = validationResult(req);
    console.log("sss", req.body);
    
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      throw new ErrorHandler("This email is already used!", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      phone,
    });

    const token = createToken(user, "7d");
    const userWithoutPassword = user.toObject();
    const { password: _, ...userResponse } = userWithoutPassword;

    return res.json({
      success: true,
      message: "Account created success",
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

// Register business Account
export const registerBusinessController = async (
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
    const hashedPassword = await bcrypt.hash(password, 10);



    const user = await userModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      phone,
      // user_type: "business"
    });

    const existsShop = await shopModel.findOne({ business_id: user?._id });
    if (!existsShop) {
      await shopModel.create({ business_id: user?._id });
    }

    const token = createToken(user, "7d");
    const userWithoutPassword = user.toObject();
    const { password: _, ...userResponse } = userWithoutPassword;

    return res.json({
      success: true,
      message: "Account created success",
      token,
      user: userResponse,
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
      token: "",
    });
  } catch (error) {
    next(error);
  }
};

// Login customer Account
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
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ErrorHandler("Email is not registered", 400);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ErrorHandler("Password is not match", 400);
    }
    const token = createToken(user, "7d");
    const userWithoutPassword = user.toObject();
    const { password: _, ...userResponse } = userWithoutPassword;

    return res.json({
      success: true,
      message: "Signin success",
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};
// Login business Account
export const signinBusinessController = async (
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
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ErrorHandler("Email is not registered", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ErrorHandler("Password is not match", 400);
    }
    const token = createToken(user, "7d");

    const existsShop = await shopModel.findOne({ business_id: user?._id });
    // if (!existsShop) {
    //   await shopModel.create({ business_id: user?._id });
    //   await userModel.findByIdAndUpdate(
    //     user?._id,
    //     {
    //       user_type: "business",
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    // }

    const userWithoutPassword = user.toObject();
    const { password: _, ...userResponse } = userWithoutPassword;

    return res.json({
      success: true,
      message: "Signin success",
      token,
      user: userResponse,
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
