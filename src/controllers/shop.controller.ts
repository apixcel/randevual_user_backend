import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import shopModel from "../models/shop.model";
import { SortOrder } from "mongoose";

export const createShopController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        const { ...shopData } = req.body;
        const shop = await shopModel.create(shopData);

        return res.status(201).json({
          success: true,
          msg: "Shop has been created successfully.",
          shop,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }
);

export const findShopByuserIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    const shop = await shopModel.findOne({ business_id: userId });

    return res.status(200).json({
      success: true,
      msg: "User shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopByIdController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const shop = await shopModel
      .findById(id)
      .populate("categories")
      .populate("team")
      .populate("services")
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      });

    return res.status(200).json({
      success: true,
      msg: "Shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopByServiceController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    /*
    address: '123 Main St',
    location: {
      type: 'Point',
      coordinates: [-73.856077, 40.848447],
    }
    */
    try {
      // const { lng, lat, maxDistance = 5000 } = req.query;
      const { data: subService } = req.query;

      console.log("query", req.query);

      /*
{
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance), // Convert to meters
        },
      },
      categoryTitle: { $regex: new RegExp("^" + subService + "$", "i") },
    }
*/
      const shop = await shopModel
        .find({
          $or: [
            { shopName: { $ne: "" } },
            { about: { $ne: "" } },
            { username: { $ne: "" } },
          ],
          categoryTitle: { $regex: new RegExp("^" + subService + "$", "i") },
        })
        .populate("categories")
        .populate("team")
        .populate("services")
        .populate("reviews");

      return res.status(200).json({
        success: true,
        msg: "Shop has been retrived successfully.",
        shop,
      });
    } catch (error) {
      return res.json({
        data: "failed",
      });
    }
  }
);

export const getShopMoreController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const shop = await shopModel
      .find({
        $or: [
          { shopName: { $ne: "" } },
          { about: { $ne: "" } },
          { username: { $ne: "" } },
        ],
      })
      .skip(Number(skip))
      .limit(Number(limit))
      .select("shopName media categoryTitle ratings numOfratings")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "More shop has been retrived successfully.",
      shop,
    });
  }
);

export const getShopMoreINServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const shops = await shopModel
      .find({
        $or: [
          { shopName: { $ne: "" } },
          { about: { $ne: "" } },
          { username: { $ne: "" } },
        ],
      })
      .skip(skip)
      .limit(Number(limit))
      .select("shopName media categoryTitle")
      .populate("services")
      .exec();

    res.status(200).json({
      success: true,
      msg: "Shops retrieved successfully.",
      shops,
    });
  } catch (error) {
    next(error);
  }
};

export const updateShopByIdUpdateController = catchAsyncErrors(
  async (req: any, res: Response, next: NextFunction) => {
    const id = req.user?._id;

    const newUserData = req.body;
    console.log(newUserData);

    const shop = await shopModel.updateOne(
      { business_id: id },
      {
        $set: {
          ...newUserData,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Shop has been updated successfully.",
      shop,
    });
  }
);

// for app only filter
export const getFilteredShopsController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sortBy, maxPrice, latitude, longitude } = req.query;

    const parsedMaxPrice = maxPrice ? Number(maxPrice) : null;
    const parsedLatitude = latitude ? Number(latitude) : null;
    const parsedLongitude = longitude ? Number(longitude) : null;

    // ========= sorting =========
    let sortCriteria: { [key: string]: SortOrder } = {};

    if (sortBy === "top-rated") {
      sortCriteria = { ratings: -1 };
    } else if (sortBy === "newest") {
      sortCriteria = { ratings: 1 };
    }
    else {
      sortCriteria = {};
    }

    try {
      const queryConditions: any = {
        $and: [
          { shopName: { $ne: "" } },
          { about: { $ne: "" } },
          { username: { $ne: "" } },
          { paymentMethod: { $ne: "" } },
          { location: { $ne: "" } },
        ],
      };

      if (parsedMaxPrice !== null && !isNaN(parsedMaxPrice)) {
        queryConditions["services"] = {
          $elemMatch: {
            list: {
              $elemMatch: {
                option: {
                  $elemMatch: { cost: { $lte: parsedMaxPrice } }
                }
              }
            }
          }
        };
      }

      if (parsedLatitude !== null && parsedLongitude !== null) {
        if (parsedLatitude !== 0 && parsedLongitude !== 0) {
          queryConditions.location = {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [parsedLongitude, parsedLatitude],
              },
              $maxDistance: 10000,
            },
          };
        }
      }

      const shops = await shopModel
        .find(queryConditions)
        .populate("categories")
        .populate("team")
        .populate("services")
        .populate("reviews")
        .populate({
          path: "reviews",
          populate: {
            path: "user",
          },
        })
        .sort(sortCriteria)
        .limit(10);

      return res.status(200).json({
        success: true,
        msg: "Shops retrieved successfully.",
        shops,
      });
    } catch (error) {
      console.log(error);
      
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);
