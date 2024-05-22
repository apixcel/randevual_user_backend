import { check } from "express-validator";

export const validateSign = [
  check("firstname", "Firstname is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("First name must be between 3 to 32 characters"),
  check("lastname", "Lastname is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("Last name must be between 3 to 32 characters"),
  // check("username", "Username is required")
  //   .notEmpty()
  //   .isLength({
  //     min: 3,
  //     max: 32,
  //   })
  //   .withMessage("Username must be between 3 to 32 characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

export const validateLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
