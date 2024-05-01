import express from "express";
import { CreateBlogController, GetBlogByIdController, GetMoreBlogsController } from "../../controllers/blog.controller";

const router = express.Router();

router.post("/create", CreateBlogController);
router.post("/b/more", GetMoreBlogsController);
router.get("/b/:id", GetBlogByIdController);

export default router;