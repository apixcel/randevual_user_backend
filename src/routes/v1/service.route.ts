import express from "express";
import {
  createServiceController,
  getMoreServiceController,
  getOwnerService,
  updateServiceController,
} from "../../controllers/service.controller";
const router = express.Router();

// router.get("/read");
router.post("/s/create", createServiceController);
router.get("/s/more", getMoreServiceController);
router.patch("/s/:id", updateServiceController);

// service of a shop owner
router.get("/s/service/:id", getOwnerService);

export default router;
