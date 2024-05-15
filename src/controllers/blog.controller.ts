import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import blogModel from "../models/blog.model";

export const CreateBlogController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...blogData } = req.body;
      const blog = await blogModel.create(blogData);
      return res.status(201).json({
        success: true,
        msg: "Blog has been created successfully.",
        blog,
      });
    }
  }
);

export const GetMoreBlogsController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = await blogModel.find();
    return res.status(201).json({
      success: true,
      msg: "More blog has been retrived successfully.",
      blog,
    });
  }
);

export const GetBlogByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    return res.status(201).json({
      success: true,
      msg: "Get single blog",
      blog,
    });
  }
);

export const UpdateBlogByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const id = req.params.id;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...blogData } = req.body;
      const blog = await blogModel.findByIdAndUpdate(id, blogData, {
        new: true,
      });
      return res.status(201).json({
        success: true,
        msg: "Blog has been updated successfully.",
        blog,
      });
    }
  }
);

export const deleteBlogByIdController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const deleteBooking = await blogModel.findByIdAndDelete(id);

      return res.status(201).json({
        success: true,
        msg: "Booking deleted successfully",
        deleteBooking,
      });
    } catch (error) {
      return res.status(201).json({
        success: true,
        msg: "Booking deletation failed",
      });
    }
  }
);
