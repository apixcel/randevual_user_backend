import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { templateGenerator } from "../helpers/template/whitelabel";

export const createWhiteLabelController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const {} = req.body;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const data = "arko h=bhai er shop";
        const name = "arko";
        const newFolderPath = path.join(
          process.cwd(),
          "src",
          "shop",
          name,
          "index.html"
        );

        fs.mkdirSync(path.dirname(newFolderPath), { recursive: true });
        const content = templateGenerator(data);
        fs.writeFileSync(newFolderPath, content);

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error adding customer and payment method:", error);
        res
          .status(500)
          .json({ error: "Unable to add customer and payment method" });
      }
    }
  }
);

export const getWhiteLabelController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const {} = req.body;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        /*
        
        */

        res.render("users", {
          users: "users",
          title: "EJS example",
          header: "Some users",
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error adding customer and payment method:", error);
        res
          .status(500)
          .json({ error: "Unable to add customer and payment method" });
      }
    }
  }
);
