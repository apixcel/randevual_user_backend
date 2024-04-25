import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/auth.model";
import ErrorHandler from "../utils/errorhandler";
import bcrypt from "bcrypt";
import createToken from "../utils/jwtToken";
import jwt from "jsonwebtoken";
import sendMessage from "../utils/sendMessage";

// Register Account
export const registerController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error: any) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const user1 = await User.findOne({ email }).select("+password");

      if (user1) {
        return next(new ErrorHandler("This email is already used!", 400));
      }

      const user2 = await User.findOne({ username }).select("+password");

      if (user2) {
        return next(new ErrorHandler("This username is already used!", 400));
      }
      const token = jwt.sign(req.body, process.env.JWT_SECRET as string, {
        expiresIn: "5m",
      });
      /*
  senderMail: string,
  senderPawword: string,
  receiverMail: string,
  subject: string,
  html: string
*/

      const h1Text = "Thanks for joining Randevual.";
      const link = `${process.env.CLIENT_URL}/users/activate/${token}`;
      const linkText = `${link}`;
      const senderMail = `${process.env.INFO_MAIL_NAME}`;
      const senderPassword = `${process.env.INFO_MAIL_PASS}`;
      const subject = "Randevual account activation.";
      const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Randevual</title>
</head>
<body>
    <div>
    <h2>${h1Text}</h2>
    <p>Please active your accont. <a href={${linkText}}>Active</a>. visit this link: ${linkText} or copy and paste on your browser</p>
    </div>
</body>
</html>
      `;
      const mailsent = await sendMessage(
        senderMail,
        senderPassword,
        email,
        subject,
        html
      );
      if (!mailsent)
        return next({ message: "Invalid email or password", status: 404 });
      
      return res.status(200).json({ message: "Thanks to create an account. Please check your mail to active the account", status: 201});
    }
  }
);

// Activation by Verify Email
export const activationController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({
              errors: "Expired link. Signup again",
            });
          } else {
            const userData = jwt.decode(token);

            const user = new User(userData);
            const newToken = createToken(user, "7d");

            await user.save();

            return res.json({
              success: true,
              message: "Signup success",
              token: newToken,
              user,
            });
          }
        }
      );
    } else {
      return res.json({
        message: "error happening please try again",
      });
    }
  }
);

// Login Account
export const signinController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const user = await User.findOne({ email, isVerified: true }).select(
        "+password"
      );
      if (!user) {
        return next({ message: "Invalid email or password", status: 404 });
      }
      const isMatched = await bcrypt.compare(password, `${user?.password}`);

      if (!isMatched)
        return next({ message: "Invalid email or password", status: 404 });

      const token = await jwt.sign(
        { _id: user?._id },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "7d" }
      );
      return res.status(200).json({ success: true, token, data: user });
    }
  }
);
