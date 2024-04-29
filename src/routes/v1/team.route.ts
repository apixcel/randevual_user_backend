import express from "express";
import { createTeamController, getAllTeamController } from "../../controllers/team.controller";
const router = express.Router();

router.post("/t/create",createTeamController);
router.get("/members",getAllTeamController);


export default router;
