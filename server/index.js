// import express from "express";
// // import mongoose from "mongoose";
// import connectDB from "./config/db.js";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
// connectDB();
// import authRoutes from "./routes/auth.js";
// import chatRoutes from "./routes/chat.js";
// import dsaTutorRoutes from "./routes/dsaTutor.js";
// import Tutor from "./models/Tutor.js";

// const app = express();
// app.use(express.json());
// app.post("/test", (req, res) => {
//   res.json(req.body);
// });

// app.use(cors());
// console.log("ENV CHECK:", process.env.GEMINI_API_KEY);

// app.use("/api/auth", authRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/dsa", dsaTutorRoutes);

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("MongoDB connected"))
// //   .catch(console.error);
// // app.post("/add", async (req, res) => {
// //   try {
// //     const tutor = await Tutor.create({
// //       name: req.body.name,
// //       topic: req.body.topic,
// //     });

// //     res.status(201).json({
// //       message: "Data inserted successfully",
// //       data: tutor,
// //     });

// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });
// app.post("/add", async (req, res) => {
//   const { name, topic } = req.body || {};

//   if (!name || !topic) {
//     return res.status(400).json({ error: "Name and topic are required" });
//   }

//   try {
//     const tutor = await Tutor.create({ name, topic });
//     res.status(201).json(tutor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// // 🔹 Get All Data
// app.get("/tutors", async (req, res) => {
//   try {
//     const tutors = await Tutor.find();
//     res.json(tutors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(5000, () => console.log("Server running on 5000"));
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