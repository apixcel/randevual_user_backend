import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import distributionModel from "../models/distribution.model";

const stripe = require("stripe")(process.env.STRIPE_S_K);

export const createPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { name, email, userId, stripeAccountId } = req.body;

    if (!errors.isEmpty()) {
      // Handle validation errors
    }

    try {
      const user = await userModel.find({});

      if(!user){
        return
      }

      
      const account = await stripe.accounts.create({
        type: "express",
      });

      const distribution = await distributionModel.create({});

      return res.status(201).json({
        success: true,
        msg: "Payment intent created successfully",
      });
    } catch (error) {
      console.log("Error creating payment:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);
