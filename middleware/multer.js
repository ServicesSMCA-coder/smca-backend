// Backend/middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    // accept images only
    if (/image\/(jpeg|png|webp|gif)/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
});
