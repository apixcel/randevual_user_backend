import express from "express";
const router = express.Router();

import auth from "./auth.route";
import blog from "./blog.route";
import booking from "./booking.route";
import category from "./category.route";
import contact from "./contact.route";
import earning from "./earnning.route";
import uploadFile from "./fileupload.route";
import payment from "./payment.route";
import userReview from "./review.route";
import service from "./service.route";
import shop from "./shop.route";
import subscribe from "./subscribe.route";
import support from "./support.route";
import team from "./team.route";
import transaction from "./transaction.route";
import user from "./user.route";
import subscription from "./subscription.route";


router.use("/auth", auth);
router.use("/users", user);
router.use("/shop", shop);
router.use("/earning", earning);
router.use("/payment", payment);
router.use("/booking", booking);
router.use("/service", service);
router.use("/category", category);
router.use("/team", team);
router.use("/review", userReview);
router.use("/contact", contact);
router.use("/support", support);
router.use("/file", uploadFile);
router.use("/blog", blog);
router.use("/subscribe", subscribe);
router.use("/transaction", transaction);
router.use("/subscription", subscription);

export default router;
