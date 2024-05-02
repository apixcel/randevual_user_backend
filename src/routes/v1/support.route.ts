import express from "express";
import { CreateSupportController, SendSupportEmailController } from "../../controllers/support.controller";

const router = express.Router();

router.post("/create", CreateSupportController)
router.post("/send", SendSupportEmailController)


export default router;
