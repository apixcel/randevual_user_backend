import expres from "express";
import {
  getAllTransaction,
  getTotalTransaction,
} from "../../controllers/transaction.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = expres.Router();
router.use("/get/total", isAuthenticatedUser, getTotalTransaction);
router.use("/get/all", isAuthenticatedUser, getAllTransaction);
export default router;
