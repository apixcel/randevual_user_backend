import express from "express";
const router = express.Router();
import auth from "./auth.route";
import user from "./user.route";
import shop from "./shop.route";
import booking from "./booking.route";
import service from "./service.route";
import category from "./category.route";
import team from "./team.route";


router.use("/auth", auth);
router.use("/user", user);
router.use("/shop", shop);
router.use("/booking", booking);
router.use("/service", service);
router.use("/category", category);
router.use("/team", team);


export default router;
