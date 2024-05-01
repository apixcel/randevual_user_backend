import { check } from "express-validator";

export const validateService = [
  check("listName", "List name is required").notEmpty(),
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
  check("team_id", "Team ID is required").notEmpty(),
];
