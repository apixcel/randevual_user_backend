import express from "express";
import {
  deleteSingleUser,
  getAuthor,
  getSingleUser,
  updateSingleUser,
} from "../../controllers/user.controller";
import { isValidToekn } from "../../middlewares/checkToken";
import { isAuthenticatedUser } from "../../middlewares/auth";

const router = express.Router();
// /user

// get singleUserBy access Token
router.get("/u/g/auth", isValidToekn, getAuthor);

// Route to get a single user by ID
router.get("/u/:id", getSingleUser);

// Route to update a user by ID
router.patch("/u/update", isAuthenticatedUser, updateSingleUser);

// Route to delete a user by ID
router.delete("/u/:id", deleteSingleUser);

router.get("/d", (req, res) => {
  res.send("fahim pagla");
});

export default router;
