import express from "express";
import { createWhiteLabelController } from "../../controllers/white.label.controller";

const router = express.Router();

router.post("/create",createWhiteLabelController);




export default router;
