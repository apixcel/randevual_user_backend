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
import clientReview from "./client.review.route";

// Importing all validate file
import { validateLogin, validateSign } from "../../helpers/valid/validAuth";
import { validateShop } from "../../helpers/valid/validShop";
import { validatePayment } from "../../helpers/valid/validPayment";
import { validateBooking } from "../../helpers/valid/validBooking";
import { validateService } from "../../helpers/valid/validService";
import { validateCategory } from "../../helpers/valid/validCategory";
import { validateTeam } from "../../helpers/valid/validTeam";
import { validateReview } from "../../helpers/valid/validClient";
import { validateSupport } from "../../helpers/valid/validSupport";

router.use("/auth", validateSign, auth);
router.use("/user", validateLogin, user);
router.use("/shop", validateShop, shop);
router.use("/payment", validatePayment, payment);
router.use("/booking", validateBooking, booking);
router.use("/service", validateService, service);
router.use("/category", validateCategory, category);
router.use("/team", validateTeam, team);
router.use("/review", validateReview, userReview);
router.use("/contact", contact);
router.use("/support", validateSupport, support);
router.use("/clientreview", validateReview, clientReview);

export default router;
