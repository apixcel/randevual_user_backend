import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import billingModel from "../models/billing.model";
import paymentModel from "../models/payment.model";

const stripe = require("stripe")(process.env.STRIPE_S_K);

/*
Check if the customer exists in Stripe using the provided userId.
If the customer doesn't exist, create a new customer in Stripe.
If the card is not already saved for the customer, save it as a payment method.
If the payment intent with the same card already exists, return its ID.
If not, create a new payment intent without confirming it immediately.

*/

export const createPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { paymentMethodId, amount, confirmNow, email } = req.body;

    if (!errors.isEmpty()) {
      // Handle validation errors
    }

    try {
      const customer = await stripe.customers.create({
        email,
      });

      const intent = await stripe.paymentIntents.create({
        customer: customer.id,
        payment_method: paymentMethodId,
        amount: 2000,
        currency: "usd",
        confirm: confirmNow,
      });
      
      // // Attach the payment method to the customer
      // await stripe.paymentMethods.attach(paymentMethodId, {
      //   customer: customer.id,
      // });
      
      console.log(intent);
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
      // Retrieve the payment intent ID from the request body
      const paymentIntentId = req.body.paymentIntentId;

      // Confirm the payment intent
      const paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId
      );

      // Handle the payment confirmation response
      if (paymentIntent.status === "succeeded") {
        // Payment succeeded, split the payment between client and company
        const transferGroup = paymentIntent.id; // Use the payment intent ID as the transfer group

        // Transfer 80% to client's account
        const clientTransfer = await stripe.transfers.create({
          amount: Math.round(paymentIntent.amount * 0.8), // 80% of the payment amount
          currency: paymentIntent.currency,
          destination: "client_connected_account_id", // Replace with your client's connected account ID
          transfer_group: "",
        });

        // Transfer 20% to company's account
        const companyTransfer = await stripe.transfers.create({
          amount: Math.round(paymentIntent.amount * 0.2), // 20% of the payment amount
          currency: paymentIntent.currency,
          destination: "company_connected_account_id", // Replace with your company's connected account ID
          transfer_group: "",
        });

        // Handle successful transfers
        return res.status(200).json({
          success: true,
          msg: "Payment confirmed and split successfully",
          clientTransferId: clientTransfer.id,
          companyTransferId: companyTransfer.id,
        });
      } else {
        // Payment failed
        return res.status(400).json({
          success: false,
          error: "Payment confirmation failed",
        });
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);
