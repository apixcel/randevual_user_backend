import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import sendMessage from "../utils/sendMessage";
import { validationResult } from "express-validator";

export const CreateContactController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

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
      const mailsent = await sendMessage(
        senderMail,
        senderPassword,
        contactData.email,
        subject,
        html
      );
      if (!mailsent)
        return next({ message: "Invalid email or password", status: 404 });

      return res.status(200).json({
        message: "Message sent successfully",
        status: 201,
      });
    }
  }
);
