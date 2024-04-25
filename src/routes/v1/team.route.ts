import express from "express";
import { createTeamController } from "../../controllers/team.controller";
const router = express.Router();

router.post("/create",createTeamController);


export default router;
