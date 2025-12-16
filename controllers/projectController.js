// Backend/controllers/projectController.js
import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, location, category, status, images = [] } = req.body;

    const project = await Project.create({
      title,
      description,
      images: typeof images === "string" ? JSON.parse(images) : images,
      location,
      category,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({ project });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.images && typeof data.images === "string") data.images = JSON.parse(data.images);

    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ project });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).limit(100);
    res.json({ projects });
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ project });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
