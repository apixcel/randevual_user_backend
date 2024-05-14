import express from "express";
import { CreateBlogController, GetBlogByIdController, GetMoreBlogsController, UpdateBlogByIdController, deleteBlogByIdController } from "../../controllers/blog.controller";

const router = express.Router();

router.post("/create", CreateBlogController);
router.get("/b/more", GetMoreBlogsController);
router.get("/b/:id", GetBlogByIdController);
router.patch("/b/update/:id", UpdateBlogByIdController);
router.delete("/b/delete/:id", deleteBlogByIdController);

export default router;