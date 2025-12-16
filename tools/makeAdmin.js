import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

const email = process.argv[2];

if (!email) {
  console.log("❌ Usage: node tools/makeAdmin.js user@example.com");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ MongoDB Connected");

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();

    console.log(`✔ SUCCESS: ${email} is now an ADMIN`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();
