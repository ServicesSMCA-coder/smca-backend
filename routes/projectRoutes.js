// Backend/routes/projectRoutes.js
import express from "express";
import { createProject, updateProject, deleteProject, getProjects, getProject } from "../controllers/projectController.js";
import { uploadImages } from "../controllers/uploadController.js";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { deleteImage } from "../controllers/imageDeleteController.js";

const router = express.Router();

// public
router.get("/", getProjects);
router.get("/:id", getProject);

// protected admin
router.post("/upload", authMiddleware, adminMiddleware, upload.array("images", 6), uploadImages);
router.post("/", authMiddleware, adminMiddleware, createProject);
router.put("/:id", authMiddleware, adminMiddleware, updateProject);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProject);
router.post("/delete-image", authMiddleware, adminMiddleware, deleteImage);

export default router;
