import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import projectRoutes from "./routes/projectRoutes.js";

// Load env FIRST
dotenv.config();

// CONNECT DB BEFORE ANYTHING ELSE
connectDB();

const app = express();

// ...
app.use("/projects", projectRoutes);

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => res.send("API Running"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
