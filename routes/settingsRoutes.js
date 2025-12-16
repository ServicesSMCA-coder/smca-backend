// routes/settingsRoutes.js
import express from "express";
import Settings from "../models/Settings.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /settings -> returns settings (creates default if not exists)
router.get("/", async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({ contactEmail: process.env.SMTP_USER });
  res.json({ settings });
});

// PUT /settings -> update contactEmail (protected)
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { contactEmail } = req.body;
    if (!contactEmail) return res.status(400).json({ message: "contactEmail required" });

    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({ contactEmail });
    else settings.contactEmail = contactEmail;

    await settings.save();
    res.json({ settings });
  } catch (err) {
    console.error("Settings update error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
