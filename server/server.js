import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { env } from "./utils/env.js";
import connectDB from "./config/connectDB.js";


const app = express();

let server;


const PORT = env.PORT;


const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      "http://localhost:8081",
      "http://localhost:5173",
      "https://mindsprint-28zb.onrender.com"

    ].filter(Boolean);
    console.log("CORS request origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS rejected origin:", origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));
app.use(express.json());

// app.use("/api/u", userRouter);
// app.use("/api/quizzes", quizRouter);
// app.use("/api/materials", materialRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "zenius server running!!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint does not exist.",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message.includes("CORS")) {
    return res.status(403).json({
      success: false,
      message: err.message,
      allowedOrigins: corsOptions.origin instanceof Function ? ["Dynamic check"] : corsOptions.origin,
    });
  }

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Allowed client URL: ${process.env.CLIENT_URL}`);
      console.log(`Allowed admin URL: ${process.env.ADMIN_URL}`);
      console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "Set" : "Missing"}`);
      console.log(`JWT_REFRESH_SECRET: ${process.env.JWT_REFRESH_SECRET ? "Set" : "Missing"}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server?.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});