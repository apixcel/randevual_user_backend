import express from "express";
import { createCategoryController, getAllCategorycontroller } from "../../controllers/category.controller";
const router = express.Router();

router.post("/c/create", createCategoryController);
router.get("/c/more", getAllCategorycontroller);

export default router;
