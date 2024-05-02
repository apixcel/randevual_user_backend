import { check } from "express-validator";

export const validShop = [
  check("shopName", "Shop name is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Shop name must be between 3 to 32 characters"),
  check("media", "media item is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("media must"),
  check("about", "about text is required")
    .notEmpty()
    .isLength({
      min: 100,
      max: 255,
    })
    .withMessage("About must"),
  check("categories", "media item is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("media must"),
  check("media", "media item is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("media must"),
  check("media", "media item is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("media must"),
];
