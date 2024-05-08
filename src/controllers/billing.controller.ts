import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import billingModel from "../models/billing.model";
const stripe = require("stripe")(
  "sk_test_51Ih9MaIx2Kgj710NHWTajhRo4vRIEuLlZi6ye1SKf4DjFZJUOYuYoXKY6AFjnZBlCVy0udCDQ2BjU2l51zU3G7ER00qKakJoEu"
);

export const createBillingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { userId, email, paymentMethodId, cardholderName } = req.body;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
          userId,
          name: cardholderName,
          email: email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        // Attach the payment method to the newly created customer
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customer.id,
        });

        // Update the customer's default payment method
        await stripe.customers.update(customer.id, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        await billingModel.create({
          userId,
          email,
          customerId: customer.id,
        });

        res.status(200).json({ success: true, customerId: customer.id });
      } catch (error) {
        console.error("Error adding customer and payment method:", error);
        res
          .status(500)
          .json({ error: "Unable to add customer and payment method" });
      }
    }
  }
);

export const updateBillingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { customerId, paymentMethodId } = req.body;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        // Attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });

        // Set the payment method as the default for the customer
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error attaching payment method:", error);
        res.status(500).json({ error: "Unable to add payment method" });
      }
    }
  }
);

// need to save paymentid and userid
