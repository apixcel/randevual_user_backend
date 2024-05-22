import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import teamModel from "../models/team.model";

export const createTeamController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...teamData } = req.body;
      const team = await teamModel.create(teamData);
      return res.status(201).json({
        success: true,
        msg: "Team has been created successfully.",
        team,
      });
    }
  }
);

export const getAllTeamController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const team = await teamModel.find();
    return res.status(201).json({
      success: true,
      msg: "Get all team members!",
      team,
    });
  }
);

export const getAllTeamAShopController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const shop_id = req.params.id;
    const data = await teamModel.find({ shop_id });
    return res.status(201).json({
      success: true,
      msg: "Single shop teams",
      data,
    });
  }
);

export const updateTeamController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateService = await teamModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(201).json({
      success: true,
      msg: "Team updated successfully",
      updateService,
    });
  }
);

export const deleteTeamController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deleteService = await teamModel.findByIdAndDelete(id);

    return res.status(201).json({
      success: true,
      msg: "Team deleted successfully",
      deleteService,
    });
  }
);

