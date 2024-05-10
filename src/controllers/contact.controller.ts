import sgMail from "@sendgrid/mail";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
export const CreateContactController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error: any) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...contactData } = req.body;

      const senderMail = `${process.env.INFO_MAIL_NAME}`;
      const senderPassword = `${process.env.INFO_MAIL_PASS}`;
      const subject = `A new message from ${contactData.name}`;
      const html = `<p>${contactData.message}</p>`;

      const msg = {
        to: `${process.env.SENDGRID_FROM}`, // Change to your recipient
        from: `${process.env.SENDGRID_FROM}`, // Change to your verified sender
        subject,
        html: `
              <div style="display:flex;"><strong>Name</strong>:<p> ${contactData.name}</p></div>
              <div style="display:flex;"><strong>Email</strong>: <p> ${contactData.email}</p></div>
              <div style="display:flex;"><strong>Phone</strong>: <p> ${contactData.phoneNo}</p></div>
              <div style="display:flex;"><strong>Message</strong>: <p> ${contactData.message}</p></div>
              `,
      };
      const mailRes = await sgMail.send(msg);

      // if (!mailsent)
      //   return next({ message: "Invalid email or password", status: 404 });

      return res.status(200).json({
        message: "Message sent successfully",
        status: 201,
      });

      
    }
  }
);
