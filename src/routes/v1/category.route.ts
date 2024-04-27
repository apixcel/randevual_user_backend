import express from "express";
import { createCategoryController, getAllCategorycontroller } from "../../controllers/category.controller";
const router = express.Router();

router.post("/create", createCategoryController);
router.get("/s/more", getAllCategorycontroller);

export default router;
