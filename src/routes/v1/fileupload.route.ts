import express from "express";
import multer from "multer";
import { replaceFile, replaceVideoFile, uploadFile, uploadVideoFile } from "../../controllers/file.controller";

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// POST route for uploading files
router.post("/upload", upload.single("file"), uploadFile);
router.post("/replace/:publicId", upload.single("file"), replaceFile);



router.post("/upload/video", upload.single("file"), uploadVideoFile);
router.post("/replace/video/:publicId", upload.single("file"), replaceVideoFile);

export default router;
