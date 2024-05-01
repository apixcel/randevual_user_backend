import express from "express";
import { CreateContactController } from "../../controllers/contact.controller";

const router = express.Router();

router.post("/create", CreateContactController);


export default router;

