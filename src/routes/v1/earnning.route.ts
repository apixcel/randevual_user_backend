import express from "express";

import {
  CreateShopEarningStatsController,
  getLastWeekState,
  getShopEarningController,
} from "../../controllers/earning.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();

router.get("/count/:id", getShopEarningController);
router.get("/stats/:id", CreateShopEarningStatsController);
router.get("/stats/g/week", isAuthenticatedUser, getLastWeekState);
export default router;
