import { check } from "express-validator";

export const validatePayment = [
  check("customerId", "Customer ID is required").notEmpty(),
  check("userId", "User ID is required").notEmpty(),
];
