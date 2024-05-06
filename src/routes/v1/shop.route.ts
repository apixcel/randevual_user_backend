import express from "express";
import {
  createShopController,
  findShopByuserIdController,
  getShopByIdController,
  getShopByIdUpdateController,
  getShopMoreController,
  getShopMoreINServiceController,
} from "../../controllers/shop.controller";

const router = express.Router();

router.post("/s/create", createShopController);
router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);
router.get("/s/u/:userId", findShopByuserIdController);
router.get("/s/:id", getShopByIdController);
router.patch("/s/update/:id",getShopByIdUpdateController);
export default router;
