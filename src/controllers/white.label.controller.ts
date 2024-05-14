import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import shopModel from "../models/shop.model";
import whiteLabelModel from "../models/white.label.model";

export const createWhiteLabelController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { shopId, label_id } = req.body;

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const shop = await shopModel
          .findById(shopId)
          .populate("categories")
          .populate("team")
          .populate("services")
          .populate("reviews");

        if (!shop) {
          return res.status(422).json({
            errors: "Shop not found here",
          });
        }
        const exsit = await whiteLabelModel.findOne({
          shopId,
        });
        if (exsit) {
          return res.status(422).json({
            errors: "This white label already exsit!. Please try another",
          });
        }

        const data = shop;

        const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>${data}</p>
            <h2>${data}</h2>
        </body>
        </html>
        `;

        const outputDir = path.join(process.cwd(), "src", "shops", `${label_id}`);
        const outputFile = path.join(outputDir, "index.html");

        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(outputFile, template);

        const live_url = `https://shop.randevual.co/${label_id}`;

        const whiteLabel = await whiteLabelModel.create({
          shopId,
          label_id,
          live_url,
        });

        res.status(200).json({ success: true, whiteLabel });
      } catch (error) {
        console.error("Error adding customer and payment method:", error);
        res
          .status(500)
          .json({ error: "Unable to add customer and payment method" });
      }
    }
  }
);
