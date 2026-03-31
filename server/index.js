
import http from "http";
import { WebSocketServer } from "ws";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import dsaTutorRoutes from "./routes/dsaTutor.js";
import tutorRoutes from "./routes/tutor.js";
import userRoutes from "./routes/user.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Test Route
app.post("/test", (req, res) => {
  res.json(req.body);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dsa", dsaTutorRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/users", userRoutes);

// Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const server = http.createServer(app);

const wss = new WebSocketServer({
  server,
  path: "/ws",
});

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});