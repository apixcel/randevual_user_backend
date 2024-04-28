import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import serviceModel from "../models/service.model";

export const createServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...serviceData } = req.body;
      const service = await serviceModel.create(serviceData);
      return res.status(201).json({
        success: true,
        msg: "Service has been created successfully.",
        service,
      });
    }
  }
);

export const getMoreServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const getService = await serviceModel.find();

    return res.status(201).json({
      success: true,
      msg: "All services",
      getService,
    })
  }
)
// update delete