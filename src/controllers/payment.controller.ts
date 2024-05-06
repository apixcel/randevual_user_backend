import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
const stripe = require("stripe")(process.env.STRIPE_S_K);


export const createPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        // Check if the user has added a payment method
        let paymentMethodId = req.body.paymentMethodId;
        let customerId = req.body.customerId; // If available

        if (!paymentMethodId) {
          // If no payment method, create a new customer in Stripe and add the payment method
          const customer = await stripe.customers.create({
            // You can add additional customer details here if needed
          });
          customerId = customer.id;

          // Attach payment method to the customer
          const paymentMethod = await stripe.paymentMethods.attach(
            req.body.paymentMethodId,
            {
              customer: customerId,
            }
          );

          paymentMethodId = paymentMethod.id;
        }

        // Create payment intent or setup intent based on your logic
        const intent = await stripe.paymentIntents.create({
          customer: customerId,
          payment_method: paymentMethodId,
          amount: req.body.amount,
          currency: "usd",
          confirm: req.body.confirmNow,
        });

        return res.status(201).json({
          success: true,
          msg: "Payment intent created successfully",
          paymentIntentId: intent.id,
        });
      } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
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
