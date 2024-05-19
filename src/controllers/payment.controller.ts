import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import paymentModel from "../models/payment.model";
const stripe = require("stripe")(process.env.STRIPE_S_K);

export const createPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const {
      paymentMethodId,
      userId,
      amount,
      confirmNow = false,
      email,
    } = req.body;

    if (!errors.isEmpty()) {
      // Handle validation errors
    }

    try {
      const customer = await stripe.customers.create({
        email,
      });
      console.log(typeof amount, "amntathaafa");

      const intent = await stripe.paymentIntents.create({
        customer: customer.id,
        payment_method: paymentMethodId,
        amount: Number(amount * 100),
        currency: "usd",
        confirm: confirmNow,
      });

      // // Attach the payment method to the customer
      // await stripe.paymentMethods.attach(paymentMethodId, {
      //   customer: customer.id,
      // });

      const payment = await paymentModel.create({
        customerId: customer.id,
        userId,
        paymentIntentId: intent.id,
      });

      return res.status(201).json({
        success: true,
        msg: "Payment intent created successfully",
        paymentIntentId: intent.id,
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

export const confirmPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId
      );

      return res.status(400).json({
        success: false,
        error: "Payment confirmation failed",
      });
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);
