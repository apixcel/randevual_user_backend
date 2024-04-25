import express from "express";
import {
  createShopController,
  getShopByIdController,
  getShopMoreController,
} from "../../controllers/shop.controller";

const router = express.Router();

router.post("/create", createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/:id", getShopByIdController);

export default router;
