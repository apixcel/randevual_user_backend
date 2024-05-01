import express from "express";
import {
  createCategoryController,
  getAllCategorycontroller,
} from "../../controllers/category.controller";
import { validateCategory } from "../../helpers/valid/validCategory";
const router = express.Router();

router.post("/c/create", validateCategory, createCategoryController);
router.get("/c/more", getAllCategorycontroller);

export default router;
