import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import shopModel from "../models/shop.model";

export const createShopController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const { ...shopData } = req.body.data;
        const shop = await shopModel.create(shopData);

        return res.status(201).json({
          success: true,
          msg: "Shop has been created successfully.",
          shop,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
);

export const findShopByuserIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    // console.log("");
    
    const shop = await shopModel.findOne({ business_id: userId });

    return res.status(200).json({
      success: true,
      msg: "User shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopByIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const shop = await shopModel
      .findById(id)
      .populate("categories")
      .populate("team")
      .populate("services")
      .populate("reviews");

    return res.status(200).json({
      success: true,
      msg: "Shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopMoreController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const shop = await shopModel
      .find()
      .skip(Number(skip))
      .limit(Number(limit))
      .select("shopName media categoryTitle ratings numOfratings")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "More shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopMoreINServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const shops = await shopModel
      .find()
      .skip(skip)
      .limit(Number(limit))
      .select("shopName media categoryTitle")
      .populate("services")
      .exec();

    res.status(200).json({
      success: true,
      msg: "Shops retrieved successfully.",
      shops,
    });
  } catch (error) {
    next(error);
  }
};

export const getShopByIdUpdateController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const newUserData = req.body;
    const shop = await shopModel.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      msg: "Shop has been updated successfully.",
      shop,
    });
  }
);
