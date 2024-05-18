import { check } from "express-validator";

export const validateBlog = [
  check("title", "Title is required").notEmpty(),
  check("images.thumbnail", "Thumbnail is required").notEmpty(),
  check("images.cover", "Cover image is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
];
