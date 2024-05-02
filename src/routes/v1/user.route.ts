import express from "express";
import { deleteSingleUser, getSingleUser, updateSingleUser } from "../../controllers/user.controller";

const router = express.Router();
// /user
// Route to get a single user by ID
router.get("/u/:id", getSingleUser);

// Route to update a user by ID
router.put("/u/:id", updateSingleUser);

// Route to delete a user by ID
router.delete("/u/:id", deleteSingleUser);

export default router;
