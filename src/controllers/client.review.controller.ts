import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { validationResult } from "express-validator";
import clientReviewModel from "../models/client.review.model";



export const createClientReviewController = catchAsyncErrors(
    async(req:Request, res:Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const firstError = errors.array().map((error) => error.msg)[0];
            return res.status(422).json({
                errors: firstError,
              });
        } else {
            const {...clientReviewData} = req.body;
            const clientReveiwCreate = await clientReviewModel.create(clientReviewData);
            return res.status(201).json({
                success: true,
                msg: "Client reivew created",
                clientReveiwCreate,
            })
        }

    }
)

export const getAllClientReviewController = catchAsyncErrors(
    async(req:Request, res:Response, next: NextFunction) => {
        const data = await clientReviewModel.find();
        return res.status(201).json({
            success: true,
            msg: "All client reviews",
            data,
        })
    }
)