import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

const stripe = require("stripe")(
  "sk_test_51Ih9MaIx2Kgj710NHWTajhRo4vRIEuLlZi6ye1SKf4DjFZJUOYuYoXKY6AFjnZBlCVy0udCDQ2BjU2l51zU3G7ER00qKakJoEu"
);

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
      
        const paymentMethod = await stripe.paymentMethods.create({
          type: "card",
          card: {
            token: req.body.stripeToken,
          },
        });
        
        const customer = await stripe.customers.create({
          email: "jennyrosen@example.com",
          payment_method: paymentMethod.id,
          invoice_settings: {
            default_payment_method: paymentMethod.id,
          },
        });

        return res.status(201).json({
          success: true,
          msg: "Payment method (card) has been added to the customer successfully.",
          customer,
          paymentMethod,
        });
      } catch (error) {
        console.error("Error adding payment method (card):", error);
        return res.status(500).json({
          success: false,
          error: "Could not add payment method (card) to the customer.",
        });
      }
    }
  }
);
