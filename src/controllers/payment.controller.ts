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

      const intent = await stripe.paymentIntents.create({
        customer: customer.id,
        payment_method: paymentMethodId,
        amount: Number(amount * 100),
        currency: "usd",
        confirm: confirmNow,
      });
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
        errr: error,
      });
    }
  }
);

export const confirmPaymentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, paymentIntentId } = req.body;

    const businessOwner = await userModel.findById(userId);

    if (!businessOwner) {
      return res.json({
        success: false,
        message: "user not found",
        data: null,
      });
    }

    if (businessOwner.user_type !== "business") {
      return res.json({
        success: false,
        message: "not a business owner",
        data: null,
      });
    }

    const account = await connectedAccountModel.findOne({
      userId: businessOwner._id,
    });
    if (!account) {
      return res.json({
        success: false,
        message: "No connected account found",
        data: null,
      });
    }

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      return_url: "http://localhost:3000/",
    });

    const accountDetails = await stripe.accounts.retrieve(account.accountId);
    if (accountDetails.capabilities.transfers !== "active") {
      return res.json({
        success: false,
        message: "Connected account does not have transfers capability enabled",
        data: null,
      });
    }

    const transfer = await stripe.transfers.create({
      amount: paymentIntent.amount, // Amount to transfer
      currency: paymentIntent.currency,
      destination: account.accountId,
      transfer_group: `group${paymentIntent.id}`,
    });

    await transactionModel.create({ ...req.body, payment: "credit_card" });

    return res.status(200).json({
      success: true,
      transfer,
      paymentIntent,
    });
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

export const createConnectedAccount = catchAsyncErrors(
  async (req, res, next) => {
    const { body } = req;
    if (!body) {
      return res.status(400).json({
        message: "Request body is missing",
        success: false,
        data: null,
      });
    }

    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        data: null,
      });
    }

    const isExistAccount = await connectedAccountModel.findOne({
      email: user.email,
    });

    if (isExistAccount) {
      return res.status(400).json({
        message: "User already has an account",
        success: false,
        data: { duplicate: true },
      });
    }

    // Create Stripe account with initial capabilities
    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    // Update Stripe account with additional information
    const updatedAccount = await stripe.accounts.update(account.id, {
      business_type: "individual", // or 'company' based on the user's type
      individual: {
        first_name: "John",
        last_name: "Doe",
        dob: { day: 1, month: 1, year: 1980 },
        ssn_last_4: "1234",
        address: {
          line1: "1234 Main St",
          city: "San Francisco",
          state: "CA",
          postal_code: "94111",
          country: "US",
        },
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.ip,
      },
    });

    // Save the account details in your database
    const accountObj = {
      userId: user._id,
      email: user.email,
      accountId: updatedAccount.id,
    };

    await connectedAccountModel.create(accountObj);
    res.send({
      message: "Account created successfully",
      success: true,
      data: accountObj,
    });
  }
);
