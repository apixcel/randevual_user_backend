import express from "express";
import { createServiceController, getMoreServiceController, updateServiceController } from "../../controllers/service.controller";
const router = express.Router();

// router.get("/read");
router.post("/create",createServiceController);
router.get("/s/more",getMoreServiceController);
router.patch("/s/:id", updateServiceController);



export default router;
