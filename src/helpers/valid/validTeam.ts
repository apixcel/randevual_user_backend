import { check } from "express-validator";

export const validateTeam = [
  check("picture", "Picture is required").notEmpty(),
  check("name", "Name is required").notEmpty(),
  check("profession", "Profession is required").notEmpty(),
  check("hourly_rate", "Hourly rate is required").isNumeric().notEmpty(),
  check("schedule", "Schedule is required")
    .isArray({ min: 1 })
    .withMessage("Schedule must contain at least one item"),
];
