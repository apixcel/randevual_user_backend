import { check } from "express-validator";

export const validateReview = [
  check("description", "Description is required").notEmpty(),
  check("rating", "Rating is required").isNumeric().notEmpty(),
  check("user", "User ID is required").notEmpty(),
];
