import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import bookingModel from "../models/booking.model";
import connectedAccountModel from "../models/connectedAccount.model";
import paymentModel from "../models/payment.model";
import transactionModel from "../models/transaction.model";
import userModel from "../models/user.model";
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
      const { body } = req;

      const user = await userModel.findById(body.userId);

      if (!user) {
        return res.json({
          sucsess: false,
          message: "user not found",
          data: null,
        });
      }

      if (user.user_type !== "business") {
        return res.json({
          sucsess: false,
          message: "not a business owner",
          data: null,
        });
      }
      const customer = await paymentModel.findOne({ userId: user._id });
      if (!customer) {
        return res.json({
          message: "no customer found",
          succsess: false,
          data: null,
        });
      }

      console.log(customer, "hello payment");
      const paymentIntent = await stripe.paymentIntents.confirm(
        customer.paymentIntentId
      );

      const account = await connectedAccountModel.findOne({ userId: user._id });
      if (!account) {
        return res.json({
          success: false,
          message: "No connected account found",
          data: null,
        });
      }
      const transfer = await stripe.transfers.create({
        amount: paymentIntent.amount, // Amount to transfer
        currency: paymentIntent.currency,
        destination: account?.accountId,
        transfergroup: `group${paymentIntent.id}`,
        // transfergroup: `group${confirmedPaymentIntent.id}`,
      });

      await transactionModel.create({ ...body });

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

export const confirmCashPaymentController = catchAsyncErrors(
  async (req, res, next) => {
    const { body } = req;
    const booking = await bookingModel.findOne({ _id: body.bookingId });
    if (!booking) {
      return res.send({
        success: false,
        message: "Booking not found",
        data: null,
      });
    }

    if (booking.payment !== "cash") {
      return res.status(400).json({
        success: false,
        message: "Booking is not in cash",
        data: null,
      });
    }

    // create cash payment
    const result = await transactionModel.create(body);
    // update booking status
    await bookingModel.findByIdAndUpdate(body.bookingId, { status: 1 });
    res.status(200).json({
      success: true,
      message: "Payment confirm",
      data: result,
    });
  }
);

export const createConectedAccount = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    if (!body) {
      return;
    }

    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
        data: null,
      });
    }
    const isExistAccount = await connectedAccountModel.findOne({
      email: user.email,
    });

    if (isExistAccount) {
      return res.status(400).json({
        message: "user already have account",
        success: false,
        data: { duplicate: true },
      });
    }

    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    const accountObj = {
      userId: user._id,
      email: user.email,
      accountId: account.id,
    };

    await connectedAccountModel.create(accountObj);
    res.send({
      message: "unable to create account",
      success: true,
      data: null,
    });
  }
);

/*
todo
* create an account in stripe
* 
* 
* 
*/
