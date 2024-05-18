import express from "express";

import { CreateShopEarningStatsController, getShopEarningController } from "../../controllers/earning.controller";

const router = express.Router();

router.get("/count/:id", getShopEarningController);
router.get("/stats/:id", CreateShopEarningStatsController);

export default router;