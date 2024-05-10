import sgMail from "@sendgrid/mail";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import supportModel from "../models/support.model";

export const SendSupportEmailController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error: any) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...supportData } = req.body;
      const senderMail = `${process.env.SUPPORT_MAIL_NAME}`;
      const senderPassword = `${process.env.SUPPORT_MAIL_PASS}`;
      const subject = `A new message from ${supportData.name}`;
      const html = `<p>${supportData.message}</p>`;
      const msg = {
        to: `${process.env.SENDGRID_FROM}`, // Change to your recipient
        from: `${process.env.SENDGRID_FROM}`, // Change to your verified sender
        subject,
        html: `
              <div style="display:flex;"><strong>Name</strong>:<p> ${supportData.name}</p></div>
              <div style="display:flex;"><strong>Email</strong>: <p> ${supportData.email}</p></div>
              <div style="display:flex;"><strong>Phone</strong>: <p> ${supportData.phoneNo}</p></div>
              <div style="display:flex;"><strong>Message</strong>: <p> ${supportData.message}</p></div>
              `,
      };
      const mailRes = await sgMail.send(msg);

      // if (!mailsent)
      //     return next({ message: "Invalid email or password", status: 404,errors });

      return res.status(200).json({
        message: "Message sent successfully",
        status: 201,
      });
    }
  }
);

export const CreateSupportController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...supportData } = req.body;
      const support = await supportModel.create(supportData);
      return res.status(201).json({
        success: true,
        msg: "support data has been created successfully.",
        support,
      });
    }
  }
);
