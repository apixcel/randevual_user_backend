import express from "express";
import {
  createShopController,
  getShopByIdController,
  getShopMoreController,
  getShopMoreINServiceController,
} from "../../controllers/shop.controller";
import { validateShop } from "../../helpers/valid/validShop";

const router = express.Router();

router.post("/s/create", validateShop, createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);
router.get("/s/:id", getShopByIdController);

export default router;
