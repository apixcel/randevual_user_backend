import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/auth.model";
import ErrorHandler from "../utils/errorhandler";
import { errorHandler } from "../helpers/dbErrorHandling";
import createToken from "../utils/jwtToken";
import jwt from "jsonwebtoken";
import _ from "lodash";
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
      sendMessage(senderMail, senderPassword, "user2.mail", subject, html);
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
        (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({
              errors: "Expired link. Signup again",
            });
          } else {
            const userData = jwt.decode(token);

            const user = new User(userData);
            const newToken = createToken(user, "7d");

            user.save((err, user) => {
              if (err) {
                return res.status(401).json({
                  errors: errorHandler(err),
                });
              } else {
                return res.json({
                  success: true,
                  message: "Signup success",
                  token: newToken,
                  user,
                });
              }
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
      User.findOne({
        email,
      })
        .select("+hashed_password")
        .select("+salt")
        .exec(async (err, user: any) => {
          if (err || !user) {
            return res.status(400).json({
              errors: "Invalid email or password.",
            });
          }
          if (!user.authenticate(password)) {
            return res.status(400).json({
              errors: "Invalid email or password.",
            });
          }
          const token = createToken(user, "7d");
          return res.json({
            success: true,
            message: "Signin success",
            token,
            user,
          });
        });
    }
  }
);

// Forgot Password
export const forgotPasswordController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      User.findOne(
        {
          email,
        },
        (err: any, user: any) => {
          if (err || !user) {
            return res.status(400).json({
              error: "User with that email does not exist",
            });
          }

          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_RESET_PASSWORD as string,
            {
              expiresIn: "10m",
            }
          );

          // console.log(token);
          return user.updateOne(
            {
              resetPasswordLink: token,
            },
            (err: any, success: any) => {
              if (err) {
                return res.status(400).json({
                  error:
                    "Database connection error on user password forgot request",
                });
              } else {
                // email sent to user
                const h1Text =
                  "Please use the following link to reset your password";
                const link = `${process.env.CLIENT_URL}/users/password/reset/${token}`;
                const subject = "Reset password of your Randevual account.";
                const paramsHeadline =
                  "Reset password of your Randevual account.";
                sendMessage(email, subject, h1Text, link, paramsHeadline, res);
              }
            }
          );
        }
      );
    }
  }
);

// Reset Password
export const resetPasswordController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resetPasswordLink, newPassword } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      if (resetPasswordLink) {
        jwt.verify(
          resetPasswordLink,
          process.env.JWT_RESET_PASSWORD as string,
          function (err: any, decoded: any) {
            if (err) {
              return res.status(400).json({
                error: "Expired link. Try again",
              });
            }

            User.findOne(
              {
                resetPasswordLink,
              },
              (err: any, user: any) => {
                if (err || !user) {
                  return res.status(400).json({
                    error: "Something went wrong. Try later",
                  });
                }

                const updatedFields = {
                  password: newPassword,
                  resetPasswordLink: "",
                };

                user = _.extend(user, updatedFields);

                user.save((err: any, result: any) => {
                  if (err) {
                    return res.status(400).json({
                      error: "Error resetting user password",
                    });
                  }
                  res.json({
                    message: `Great! Now you can login with your new password`,
                  });
                });
              }
            );
          }
        );
      }
    }
  }
);
