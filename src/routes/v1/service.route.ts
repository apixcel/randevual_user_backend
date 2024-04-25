import express from "express";
import { createServiceController } from "../../controllers/service.controller";
const router = express.Router();

// router.get("/read");
router.post("/create",createServiceController);



export default router;
