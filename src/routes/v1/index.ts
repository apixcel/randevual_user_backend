import express from "express";
const router = express.Router();

import auth from "./auth.route";
import user from "./user.route";
import shop from "./shop.route";
import booking from "./booking.route";
import service from "./service.route";
import category from "./category.route";
import team from "./team.route";
import userReview from "./review.route";
import payment from "./payment.route";
import contact from "./contact.route";
import support from "./support.route";
// import clientReview from "./client.review.route";
import uploadFile from "./fileupload.route";
import blog from "./blog.route";

router.use("/auth", auth);
router.use("/users", user);
router.use("/shop", shop);
router.use("/payment", payment);
router.use("/booking", booking);
router.use("/service", service);
router.use("/category", category);
router.use("/team", team);
router.use("/review", userReview);
router.use("/contact", contact);
router.use("/support", support);
// router.use("/clientreview", clientReview);
router.use("/file", uploadFile);

router.use("/blog", blog);

export default router;
