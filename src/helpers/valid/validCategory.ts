import { check } from "express-validator";

export const validateCategory = [
  check("label", "Label is required").notEmpty(),
  check("value", "Value is required").notEmpty(),
];
