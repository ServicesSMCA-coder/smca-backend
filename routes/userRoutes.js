import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET LOGGED-IN USER
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json({ user });
});

export default router;
