import { check } from "express-validator";

export const validateSchedule = [
  check("month", "Month is required").notEmpty(),
];
