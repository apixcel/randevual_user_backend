import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import serviceModel from "../models/service.model";
import shopModel from "../models/shop.model";

export const createServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const userId = req.user?._id;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...serviceData } = req.body;

      const shop = await shopModel.findOne({ business_id: userId });

      if (!shop) {
        return res.status(500).json({ message: "failed" });
      }

      const service = await serviceModel.create(serviceData);
      console.log("service", service);

      const serviceId = service && service?._id;
      
      await shopModel.updateOne(
        { business_id: userId },
        { $push: { services: serviceId } }
      );

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
    });
  }
);
// update delete

export const updateServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateService = await serviceModel.findByIdAndUpdate(id, req.body);

    return res.status(201).json({
      success: true,
      msg: "service updated successfully",
      updateService,
    });
  }
);

// shop owner service
export const getOwnerService = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await serviceModel.findById(id);

    return res.status(201).json({
      success: true,
      msg: "get owner service",
      result,
    });
  }
);

export const deleteServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const deleteId = req.params.id;
    const deleteService = await serviceModel.findByIdAndDelete(deleteId);

    if (!deleteService) {
      return res.status(404).json({
        success: false,
        msg: "Team member not found.",
      });
    }

    await shopModel.updateOne(
      { services: deleteId },
      { $pull: { services: deleteId }, new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "service deleted successfully",
      deleteService,
    });
  }
);

/*
booking only logged shop
*/
