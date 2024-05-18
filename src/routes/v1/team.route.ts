import express from "express";
import {
  createTeamController,
  getAllTeamController,
  getAllTeamAShopController,
  updateTeamController,
  deleteTeamController,
} from "../../controllers/team.controller";
const router = express.Router();

router.post("/t/create", createTeamController);
router.get("/members", getAllTeamController);
router.get("/t/shop/:id", getAllTeamAShopController);
router.patch("/t/update/:id", updateTeamController);
router.delete("/t/delete/:id", deleteTeamController);

export default router;
