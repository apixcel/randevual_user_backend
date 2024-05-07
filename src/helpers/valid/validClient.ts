import { check } from "express-validator";

export const validateReview = [
  check("title", "Title is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("rating", "Rating is required").isNumeric().notEmpty(),
  check("user_id", "User ID is required").notEmpty(),
];
