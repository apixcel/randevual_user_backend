import express from "express";
const router = express.Router();
import auth from "./auth.route";
import user from "./user.route";

router.use("/auth", auth);
router.use("/user", user);


export default router;
