import express from "express";
import { createWhiteLabelController, findWhiteLabelingByShopController, updateWhiteLabelingByShopController } from "../../controllers/white.label.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();

router.post("/create", isAuthenticatedUser, createWhiteLabelController);
router.get("/get/:id", 
isAuthenticatedUser,
 findWhiteLabelingByShopController);
router.patch("/update/:id", 
isAuthenticatedUser,
updateWhiteLabelingByShopController);




export default router;
