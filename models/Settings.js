// models/Settings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  contactEmail: { type: String, required: true, default: process.env.SMTP_USER || "youremail@domain.com" }
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
