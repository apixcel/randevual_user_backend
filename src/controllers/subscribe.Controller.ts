import sgMail from "@sendgrid/mail";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import subscribeModel from "../models/subscribe.model";

export const addSubscriber = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
      const body = req.body;

      const isExist = await subscribeModel.findOne(body);
      if (isExist) {
        return res.json({
          message: "Already exist",
          success: false,
          isExist: true,
          status: 201,
          res: isExist,
        });
      }

      const addNewSubscriber = await subscribeModel.create(body);

      const emailSubject = `Request for Randevual Subscription`;

      const emailTemplate = {
        to: `${body?.email}`,
        from: `${process.env.SENDGRID_CONTACT_FROM}`,
        subject: emailSubject,
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">

<div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden;">
  <div style="background-color: #007bff; color: #fff; padding: 20px;">
    <h2 style="margin: 0; font-size: 24px;">Subscription Request Received</h2>
  </div>
  <div style="padding: 20px;">
    <p style="font-size: 16px;">Hello,</p>
    <p style="font-size: 16px;">Thank you for subscribing. We have received your subscription request and will process it shortly.</p>
    <p style="font-size: 16px;">If you have any questions or concerns, feel free to reach out to us.</p>
    <p style="font-size: 16px;">Best regards,<br> Randevual</p>
  </div>
</div>

</div>
      `,
      };

      const mailRes = await sgMail.send(emailTemplate);

      return res.status(200).json({
        message: "Successfully send request for subscription",
        success: true,
        status: 201,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Something went wrong",
        error,
      });
      console.log(error);
    }
  }
);

export const getSubscribers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await subscribeModel.find();
      return res.status(201).json({
        success: true,
        msg: "service updated successfully",
        subscribers: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Something went wrong",
        error,
      });
    }
  }
);
