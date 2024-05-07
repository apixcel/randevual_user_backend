import { check } from "express-validator";

export const validateSupport = [
  check("subject", "Subject is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("user_id", "User ID is required").notEmpty(),
];
