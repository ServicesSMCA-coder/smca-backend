// Backend/tools/testCloudinary.js
import dotenv from "dotenv";
dotenv.config();

import cloudinary from "../utils/cloudinary.js";

const test = async () => {
  try {
    // Read file path passed via command line
    const localImagePath = process.argv[2];

    if (!localImagePath) {
      console.log('Usage: node Backend/tools/testCloudinary.js "C:/Users/vishn/Downloads/bike.jpg"');
      process.exit(1);
    }

    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: "smca_test", // optional Cloudinary folder
    });

    console.log("Upload success:", result.secure_url);
    process.exit(0);
  } catch (err) {
    console.error("Upload failed:", err);
    process.exit(1);
  }
};

test();
