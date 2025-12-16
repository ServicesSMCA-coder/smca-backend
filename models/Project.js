// Backend/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  location: { type: String },
  category: { type: String },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
