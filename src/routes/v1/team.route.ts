import express from "express";
import {
  createTeamController,
  getAllTeamController,
} from "../../controllers/team.controller";
import { validateTeam } from "../../helpers/valid/validTeam";
const router = express.Router();

router.post("/t/create", validateTeam, createTeamController);
router.get("/members", getAllTeamController);

export default router;
