import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import teamModel from "../models/team.model";
import shopModel from "../models/shop.model";

export const createTeamController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const userId = req.user?._id;
    console.log("Id", userId);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      const { ...teamData } = req.body;
      console.log("team", teamData);

      const shop = await shopModel.findOne({ business_id: userId });

      if (!shop) {
        return res.status(404).json({
          success: false,
          msg: "Shop not found.",
        });
      }

      const team = await teamModel.create(teamData);

      

      shop.team.push(team._id);
      await shop.save();

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

    console.log("id", id);
    console.log("body", req.body);
    

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
    const teamId = req.params.id;
    const userId = req.user?._id;
    console.log("TeamId", teamId);
    console.log("userId", userId);

    if (userId) {
      const deleteTeam = await teamModel.findByIdAndDelete(teamId);

      if (!deleteTeam) {
        return res.status(404).json({
          success: false,
          msg: "Team member not found.",
        });
      }

      await shopModel.updateOne(
        { team: teamId },
        { $pull: { team: teamId }, new: true }
      );

      return res.status(201).json({
        success: true,
        msg: "Team deleted successfully",
        deleteTeam,
      });
    } else {
      return res.status(201).json({
        success: false,
        msg: "Team deleted Failed",
      });
    }
  }
);

