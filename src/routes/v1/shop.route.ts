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
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();

router.get("/s/more", getShopMoreController);
router.get("/s/in", getShopMoreINServiceController);

router.get("/s/:id", getShopByIdController);
router.get("/s/all/subservice", getShopByServiceController);

// business

router.get(
  "/s/u/get",
  isAuthenticatedUser,
  // authorizeRoles("business")
  findShopByuserIdController
);
router.post("/s/create", validateShop, createShopController);
router.patch(
  "/s/u/update",
  isAuthenticatedUser,
  authorizeRoles("business"),
  getShopByIdUpdateController
);
export default router;
