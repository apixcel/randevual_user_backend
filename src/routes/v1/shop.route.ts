import express from "express";
import {
  createShopController,
  findShopByuserIdController,
  getShopByIdController,
  getShopByIdUpdateController,
  getShopByServiceController,
  getShopMoreController,
  getShopMoreINServiceController,
} from "../../controllers/shop.controller";
import { validateShop } from "../../helpers/valid/validShop";

const router = express.Router();

router.post("/s/create", validateShop, createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);
router.get("/s/u/:userId", findShopByuserIdController);
router.get("/s/:id", getShopByIdController);
router.get("/s/all/subservice", getShopByServiceController);
router.patch("/s/update/:id",getShopByIdUpdateController);
export default router;
