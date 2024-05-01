import express from "express";
const router = express.Router();

router.get("/d", (req, res) => {
  res.send("fahim pagla");
});

export default router;
