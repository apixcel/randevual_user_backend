import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import blogModel from "../models/blog.model";


export const CreateBlogController = catchAsyncError(
    async(req:Request, res:Response, next:NextFunction) => {
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
)


export const GetMoreBlogsController = catchAsyncError(
    async(req:Request, res:Response, next:NextFunction) => {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const blog = await blogModel
        .find()
        // .skip(Number(skip))
        // .limit(Number(limit))
        // .exec();

        return res.status(201).json({
            success: true,
            msg: "More blog has been retrived successfully.",
            blog,
          });

    }
)


export const GetBlogByIdController = catchAsyncError(
async(req: Request, res:Response, next:NextFunction) => {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    return res.status(201).json({
        success: true,
        msg: "Get single blog",
        blog,
      });
}
)