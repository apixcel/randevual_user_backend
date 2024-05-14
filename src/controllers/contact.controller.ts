import sgMail from "@sendgrid/mail";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
export const CreateContactController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

    try {
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
          to: `${contactData.email}`, // Change to your recipient
          from: `${process.env.SENDGRID_CONTACT_FROM}`, // Change to your verified sender
          subject,
          html: `
          <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">

<div style="max-width: 100%; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden;">
  <div style="background-color: #007bff; color: #fff; padding: 20px;">
    <h2 style="margin: 0; font-size: 24px;">Email Received</h2>
  </div>
  <div style="padding: 20px;">
    <p style="font-size: 16px;">Hello, ${contactData.name}</p>
    <p style="font-size: 16px;">Thank you for contacting us. We have received your email and will get back to you as soon as possible.</p>
    <p style="font-size: 16px;">If you have any further questions or concerns, feel free to reach out to us.</p>
    <p style="font-size: 16px;">Best regards,<br> Randevual</p>
  </div>
</div>

</div>
            `,
        };


        
        const mailRes = await sgMail.send(msg);

        if(mailRes[0].statusCode !== 202){
return 
        }
        console.log(mailRes);
        

        // if (!mailsent)
        //   return next({ message: "Invalid email or password", status: 404 });

        return res.status(200).json({
          message: "Message sent successfully",
          status: 201,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);
