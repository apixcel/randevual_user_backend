import { check } from "express-validator";

export const validateBooking = [
  check("list", "List is required")
    .isArray({ min: 1 })
    .withMessage("List must contain at least one item"),
  check("list.*.name", "Item name is required").notEmpty(),
  check("list.*.option", "Option is required")
    .isArray({ min: 1 })
    .withMessage("Option must contain at least one item"),
  check("list.*.option.*.cost", "Option cost is required")
    .isNumeric()
    .withMessage("Option cost must be a number"),
  check("list.*.option.*.duration", "Option duration is required").notEmpty(),
  check("total", "Total is required")
    .isNumeric()
    .withMessage("Total must be a number"),
  check("date", "Date is required").notEmpty(),
  check("time", "Time is required").notEmpty(),
  // check("team", "Team ID is required").notEmpty(),
  check("phone", "Phone number is required").notEmpty(),
  check("notes", "Notes are required").notEmpty(),
  check("visit", "Visit flag is required")
    .isBoolean()
    .withMessage("Visit must be a boolean"),
  check("payment", "Payment method is required").notEmpty(),
  check("status", "Status is required")
    .isIn([0, 1, 2])
    .withMessage("Status must be 0, 1, or 2"),
  check("user_id", "User ID is required").notEmpty(),
  check("shop_id", "Shop ID is required").notEmpty(),
];
