import express from "express";
import {
  createServiceController,
  deleteServiceController,
  getMoreServiceController,
  updateServiceController,
} from "../../controllers/service.controller";
import { validateService } from "../../helpers/valid/validService";
const router = express.Router();

// router.get("/read");
router.post("/s/create", validateService, createServiceController);
router.get("/s/more", getMoreServiceController);
router.patch("/s/:id", updateServiceController);
router.delete("/s/:id", deleteServiceController);

export default router;
