import express from "express";
import { destroyFile, uploadFile } from "../../controllers/file.controller";
import multer from "multer";

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// POST route for uploading files
router.post("/upload", upload.single("file"), uploadFile);
router.post("/destroy/:publicId", destroyFile);

export default router;
