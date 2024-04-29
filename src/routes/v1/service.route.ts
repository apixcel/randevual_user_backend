import express from "express";
import { createServiceController, getMoreServiceController } from "../../controllers/service.controller";
const router = express.Router();

// router.get("/read");
router.post("/s/create",createServiceController);
router.get("/s/more",getMoreServiceController);



export default router;
