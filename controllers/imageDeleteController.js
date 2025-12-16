import cloudinary from "../utils/cloudinary.js";

export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) return res.status(400).json({ message: "public_id missing" });

    await cloudinary.uploader.destroy(public_id);

    res.json({ success: true, message: "Image deleted from Cloudinary" });
  } catch (err) {
    console.error("DELETE IMAGE ERROR:", err);
    res.status(500).json({ message: "Error deleting image" });
  }
};
