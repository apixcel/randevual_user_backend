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
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f5f5f5;
                  padding: 20px;
                  margin: 0;
                  text-align: center;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333333;
              }
              p {
                  color: #666666;
              }
              a {
                  color: #007bff;
                  text-decoration: none;
                  font-weight: bold;
              }
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>${h1Text}</h2>
              <p>Please activate your account. <a href="${link}" style="color: #007bff;">Activate</a>. Visit this link: <a href="${link}" style="color: #007bff;">${link}</a> or copy and paste it into your browser.</p>
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

      return res.status(200).json({
        message:
          "Thanks to create an account. Please check your mail to active the account",
        status: 201,
      });
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

// Update Password
export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return next({ message: "User not found", status: 404 });
    }

    // Verify current password
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      return next({ message: "Incorrect current password", status: 400 });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password updated successfully", status: 200 });
  } catch (error) {
    next(error);
  }
};

// Forgot Password - Send Reset Email
export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next({ message: "User not found", status: 404 });
    }

    // Generate JWT token for password reset
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    // Send password reset email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailSent = await sendMessage(
      process.env.INFO_MAIL_NAME as string,
      process.env.INFO_MAIL_PASS as string,
      email,
      "Reset your Randevual password",
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
          <style>
              /* Your inline styles here */
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Reset Your Password</h2>
              <p>You have requested to reset your password. Click the following link to reset your password:</p>
              <p><a href="${resetLink}">Reset Password</a></p>
              <p>If you did not request this, you can safely ignore this email.</p>
          </div>
      </body>
      </html>
    `
    );

    if (!mailSent) {
      return next({
        message: "Failed to send password reset email",
        status: 500,
      });
    }

    return res.status(200).json({
      message: "Password reset email sent. Please check your inbox",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, newPassword } = req.body;

  try {
    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Find user by ID
    const user = await User.findById(decoded.userId).select("+password");
    if (!user) {
      return next({ message: "User not found", status: 404 });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful", status: 200 });
  } catch (error) {
    return res.status(401).json({
      message: "Expired or invalid token. Reset password again",
      status: 401,
    });
  }
};
