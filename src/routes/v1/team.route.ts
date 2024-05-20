import express from "express";
import {
  createTeamController,
  getAllTeamController,
  getAllTeamAShopController,
  updateTeamController,
  deleteTeamController,
} from "../../controllers/team.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = express.Router();

router.post("/t/create",isAuthenticatedUser, createTeamController);
router.get("/members", getAllTeamController);
router.get("/t/shop/:id", getAllTeamAShopController);
router.patch("/t/update/:id",isAuthenticatedUser, updateTeamController);
router.delete("/t/delete/:id",isAuthenticatedUser, deleteTeamController);

export default router;
