// Backend/controllers/uploadController.js
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

function uploadBufferToCloudinary(buffer, folder = "smca_projects") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploaded = [];
    for (const file of req.files) {
      const result = await uploadBufferToCloudinary(file.buffer);
      uploaded.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    res.json({ images: uploaded });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
