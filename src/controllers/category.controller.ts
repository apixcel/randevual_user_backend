import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import categoryModel from "../models/category.model";


export const createCategoryController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...categoryData } = req.body;
      const category = await categoryModel.create(categoryData);
      return res.status(201).json({
        success: true,
        msg: "Category has been created successfully.",
        category,
      });
    }
  }
);

//get all