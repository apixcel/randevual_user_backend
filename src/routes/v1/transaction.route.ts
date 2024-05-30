import expres from "express";
import { getTransactionByPaymentMethod } from "../../controllers/transaction.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = expres.Router();
router.use("/get/all", isAuthenticatedUser, getTransactionByPaymentMethod);
export default router;
