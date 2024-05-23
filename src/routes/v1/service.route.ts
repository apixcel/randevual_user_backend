import express from "express";
import {
  createServiceController,
  deleteServiceController,
  getMoreServiceController,
  updateServiceController,
} from "../../controllers/service.controller";
import { validateService } from "../../helpers/valid/validService";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = express.Router();

// router.get("/read");
router.post("/s/create", validateService, isAuthenticatedUser, createServiceController);
router.get("/s/more", getMoreServiceController);
router.patch("/s/:id", isAuthenticatedUser, updateServiceController);
router.delete("/s/:id", isAuthenticatedUser, deleteServiceController);

export default router;
