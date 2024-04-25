import express from "express";
import { createCategoryController } from "../../controllers/category.controller";
const router = express.Router();

router.post("/create", createCategoryController);

export default router;
