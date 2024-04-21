import { Document } from "mongoose";
import { Request } from "express";

export interface UserInput {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  _password: string;
  birthday?: Date;
  sex?: string;
  address?: string;
  phone?: string;
  status?: string;
  anticheat_status?: string;
  user_type?: string;
  biography?: string;
  games_played?: string[];
  social?: string[];
  avatar?: {
    public_id: string;
    url: string;
  };
  cover_photo?: {
    public_id: string;
    url: string;
  };
  followings: string[];
  followingGames: string[];
  followers: string[];
  kyc: string;
  biometrics: string;
  hashed_password: string;
  salt: string;
  resetPasswordLink?: any;
  //  resetPasswordLink ?: { default?: unknown; select?: unknown; data?: string | undefined; } | undefined;
  // makeSalt: () => string,
  makeSalt: () => string;
  encryptPassword(password: string): string;
  // encryptPassword: (password: crypto.BinaryLike) => string
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IReqAuth extends Request {
  user?: UserDocument;
  files?: any;
}

export interface CloudinaryRequest extends Request {
  files: any;
}

// declare module 'express' {
//   interface Request {
//     body: any // Actually should be something like `multer.Body`
//     files: any // Actually should be something like `multer.Files`
//   }
// }
