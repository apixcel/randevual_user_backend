import express from "express";
import {
  createShopController,
  getShopByIdController,
  getShopMoreController,
  getShopMoreINServiceController,
} from "../../controllers/shop.controller";

const router = express.Router();

router.post("/create", createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);
router.get("/s/:id", getShopByIdController);

export default router;

