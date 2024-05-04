import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorhandler';
import userModel from '../models/user.model';
import createToken from '../utils/jwtToken';
import sendMessage from '../utils/sendMessage';



// Register Account
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      throw new ErrorHandler('This email is already used!', 400);
    }
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      throw new ErrorHandler('This username is already used!', 400);
    }
    // Handle avatar and cover photo uploads here
    const token = jwt.sign(req.body, process.env.JWT_SECRET as string, {
      expiresIn: '5m',
    });
    const link = `${process.env.CLIENT_URL}/users/activate/${token}`;
    sendMessage(email, 'Cyberlete account activation.', 'Thanks for joining Cyberlete.', link, 'Cyberlete account activation.', res);
  } catch (error) {
    next(error);
  }
};

// Activation by Verify Email
export const activationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.json({ message: 'Error: Token missing.' });
    }
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const user = new User(decoded);
    const newToken = createToken(user, '7d');
    await userModel.save();
    return res.json({
      success: true,
      message: 'Signup success',
      token: newToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Login Account
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const user = await userModel.findOne({ email }).select('+hashed_password +salt');
    if (!user || !userModel.authenticate(password)) {
      throw new ErrorHandler('Invalid email or password.', 400);
    }
    const token = createToken(user, '7d');
    return res.json({
      success: true,
      message: 'Signin success',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ErrorHandler('User with that email does not exist', 400);
    }
    const token = jwt.sign({ _id: userModel._id }, process.env.JWT_RESET_PASSWORD as string, {
      expiresIn: '10m',
    });
    userModel.resetPasswordLink = token;
    await userModel.save();
    const link = `${process.env.CLIENT_URL}/users/password/reset/${token}`;
    sendMessage(email, 'Reset password of your cyberlete account.', 'Please use the following link to reset your password', link, 'Reset password of your cyberlete account.', res);
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
  try {
    const { resetPasswordLink, newPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(errors.array()[0].msg, 422);
    }
    if (!resetPasswordLink) {
      throw new ErrorHandler('Reset password link is missing', 400);
    }
    const decoded: any = jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD as string
    );
    const user = await userModel.findOne({ resetPasswordLink });
    if (!user) {
      throw new ErrorHandler('Invalid or expired reset password link', 400);
    }
    userModel.password = newPassword;
    userModel.resetPasswordLink = '';
    await userModel.save();
    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};
