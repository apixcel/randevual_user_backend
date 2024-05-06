import express from "express";
import {
  createShopController,
  findShopByuserIdController,
  getShopByIdController,
  getShopMoreController,
  getShopMoreINServiceController,
} from "../../controllers/shop.controller";

const router = express.Router();

router.post("/s/create", createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);
router.get("/s/u/:userId", findShopByuserIdController);
router.get("/s/:id", getShopByIdController);

export default router;
