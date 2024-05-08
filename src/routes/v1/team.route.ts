import express from "express";
import {
  createTeamController,
  getAllTeamController,
  getAllTeamAShopController,
} from "../../controllers/team.controller";
const router = express.Router();

router.post("/t/create", createTeamController);
router.get("/members", getAllTeamController);
router.get("/t/shop/:id", getAllTeamAShopController);

export default router;
