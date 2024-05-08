import { check } from "express-validator";

export const validateShop = [
  check("shopName", "Shop name is required").notEmpty(),
  check("media.thumbnail", "Thumbnail is required").notEmpty(),
  check("media.gallery.e2", "Gallery image e2 is required").notEmpty(),
  check("media.gallery.f1", "Gallery image f1 is required").notEmpty(),
  check("media.gallery.f2", "Gallery image f2 is required").notEmpty(),
  check("about", "About is required").notEmpty(),
  check("categories", "Categories are required")
    .isArray({ min: 1 })
    .withMessage("Categories must contain at least one item"),
  check("services", "Services are required")
    .isArray({ min: 1 })
    .withMessage("Services must contain at least one item"),
  check("team", "Team is required")
    .isArray({ min: 1 })
    .withMessage("Team must contain at least one item"),
  check("reviews", "Reviews are required")
    .isArray({ min: 1 })
    .withMessage("Reviews must contain at least one item"),
  check("paymentMethod", "Payment method is required").notEmpty(),
  check("location", "Location is required").notEmpty(),
  check("website", "Website is required").notEmpty(),
  check("facebook", "Facebook is required").notEmpty(),
  check("instagram", "Instagram is required").notEmpty(),
  check("weekStart", "Week start is required").notEmpty(),
  check("weekEnd", "Week end is required").notEmpty(),
  check("onHour", "Opening hour is required").notEmpty(),
  check("offHour", "Closing hour is required").notEmpty(),
  check("cancelPolicy", "Cancellation policy is required").notEmpty(),
];
