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
