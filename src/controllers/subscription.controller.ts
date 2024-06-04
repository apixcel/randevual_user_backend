import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import pricingModel from "../models/pricing.model";
import subscriptionModel from "../models/subscription.model";
import userModel from "../models/user.model";
const stripe = require("stripe")(process.env.STRIPE_S_K);

export const InitializeStripePlans = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create Free Plan
      const freeProduct = await stripe.products.create({
        name: "Free Plan",
        description: "Basic access",
      });
      const freePrice = await stripe.prices.create({
        unit_amount: 0,
        currency: "usd",
        recurring: { interval: "month" },
        product: freeProduct.id,
      });

      // Create Basic Plan
      const basicProduct = await stripe.products.create({
        name: "Basic Plan",
        description: "Basic access with additional features",
      });

      const basicPrice = await stripe.prices.create({
        unit_amount: 1000, // $10.00
        currency: "usd",
        recurring: { interval: "month" },
        product: basicProduct.id,
      });

      // Create Premium Plan
      const premiumProduct = await stripe.products.create({
        name: "Premium Plan",
        description: "Full access with premium features",
      });
      const premiumPrice = await stripe.prices.create({
        unit_amount: 2000, // $20.00
        currency: "usd",
        recurring: { interval: "month" },
        product: premiumProduct.id,
      });

      const pricing = await pricingModel.create({
        freePlanId: freePrice.id,
        basicPlanId: basicPrice.id,
        premiumPlanId: premiumPrice.id,
      });

      res.status(201).json(pricing);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const GetStripePricingPlans = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pricing = await pricingModel.find();
      res.status(200).json(pricing);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const getShopOwnerSubscription = catchAsyncErrors(
  async (req, res, next) => {
    const currUser = req.user;

    const result = await subscriptionModel.findOne({ userId: currUser?._id });
    if (!result) {
      return res.send({
        success: false,
        message: "NO PLAN FOUND THIS USER",
        data: null,
      });
    }

    res.status(201).json({
      success: true,
      message: "successfully plan found for this  user",
      data: result,
    });
  }
);

export const CreateCustomerSubscription = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, payment_method, plan_id } = req.body;

      // Create a new customer
      const customer = await stripe.customers.create({
        email,
        payment_method,
        invoice_settings: {
          default_payment_method: payment_method,
        },
      });

      // Create a subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: plan_id }],
        expand: ["latest_invoice.payment_intent"],
      });

      // Save to database

      let user = await userModel.findOne({ email });
      if (!user) {
        user = new userModel({ email, stripeCustomerId: customer.id });
        await user.save();
      }

      const newSubscription = new subscriptionModel({
        userId: user._id,
        stripeSubscriptionId: subscription.id,
        stripePaymentMethodId: payment_method,
        currentPlanId: plan_id,
        subscriptionStatus: subscription.status,
        subscriptionStartDate: new Date(subscription.start_date * 1000),
        subscriptionEndDate: subscription.cancel_at
          ? new Date(subscription.cancel_at * 1000)
          : null,
      });
      await newSubscription.save();

      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const UpgradeSubscription = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, new_plan_id } = req.body;
      const user = await subscriptionModel.findOne({ userId });

      if (!user) {
        return res.status(404).json({ messgae: "user not found" });
      }

      const subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );

      const updatedSubscription = await stripe.subscriptions.update(
        user.stripeSubscriptionId,
        {
          cancel_at_period_end: false,
          items: [
            {
              id: subscription.items.data[0].id,
              price: new_plan_id,
            },
          ],
        }
      );

      // Update in database
      await subscriptionModel.findOneAndUpdate(
        { stripeSubscriptionId: user.stripeSubscriptionId },
        {
          currentPlanId: new_plan_id,
          subscriptionStatus: updatedSubscription.status,
        }
      );

      res.json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const CancelSubscription = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, new_plan_id } = req.body;

      const user = await subscriptionModel.findOne({ userId });

      if (!user) {
        return res.status(404).json({ messgae: "user not found" });
      }

      // Retrieve the subscription
      const subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );

      // Update the subscription
      const updatedSubscription = await stripe.subscriptions.update(
        user.stripeSubscriptionId,
        {
          cancel_at_period_end: false,
          items: [
            {
              id: subscription.items.data[0].id,
              price: new_plan_id,
            },
          ],
        }
      );

      // Update in database
      await subscriptionModel.findOneAndUpdate(
        { stripeSubscriptionId: user.stripeSubscriptionId },
        {
          currentPlanId: new_plan_id,
          subscriptionStatus: updatedSubscription.status,
        }
      );

      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);
