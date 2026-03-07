import express from "express";
import Chat from "../models/Chat.js";
import { GoogleGenAI } from "@google/genai"; // ✅ updated SDK
import { tutorPrompt } from "../tutorPrompt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("/api/chat HIT");
 

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not loaded. Check .env configuration.",
      });
    }

    // ✅ NEW SDK client
    const ai = new GoogleGenAI({ apiKey });

    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let chat = chatId ? await Chat.findById(chatId) : null;
    if (!chat) {
      chat = await Chat.create({ messages: [] });
    }

    // Save user message
    chat.messages.push({ role: "user", content: message });

    // 🔹 Build plain-text conversation (UNCHANGED)
    const conversation = chat.messages
      .map((m) =>
        m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`,
      )
      .join("\n");

    const prompt = `
${tutorPrompt}

Conversation so far:
${conversation}

Assistant:
`;

    // ✅ NEW SDK generate call (same behavior)
    const result = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: prompt,
    });

    const reply = result.text;

    // Save assistant reply
    chat.messages.push({ role: "assistant", content: reply });
    await chat.save();

    res.json({ reply, chatId: chat._id });
  } catch (error) {
    console.error("GEMINI CHAT ERROR FULL:", error);
    res.status(500).json({
      error: error?.message || "Gemini AI error",
    });
  }
});

export default router;

// import express from "express";
// import Chat from "../models/Chat.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { tutorPrompt } from "../tutorPrompt.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   console.log("🔥 /api/chat HIT");
//   console.log("BODY:", req.body);
//   try {
//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       return res.status(500).json({
//         error: "GEMINI_API_KEY not loaded. Check .env configuration.",
//       });
//     }

//     const genAI = new GoogleGenerativeAI(apiKey);

//     const { message, chatId } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     let chat = chatId ? await Chat.findById(chatId) : null;
//     if (!chat) {
//       chat = await Chat.create({ messages: [] });
//     }

//     // Save user message
//     chat.messages.push({ role: "user", content: message });

//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-pro",
//     });

//     // 🔹 Build plain-text conversation (Gemini-safe)
//     const conversation = chat.messages
//       .map((m) =>
//         m.role === "user"
//           ? `User: ${m.content}`
//           : `Assistant: ${m.content}`
//       )
//       .join("\n");

//     const prompt = `
// ${tutorPrompt}

// Conversation so far:
// ${conversation}

// Assistant:
// `;

//     // 🔹 Generate response
//     const result = await model.generateContent(prompt);
//     const reply = result.response.text();

//     // Save assistant reply
//     chat.messages.push({ role: "assistant", content: reply });
//     await chat.save();

//     res.json({ reply, chatId: chat._id });

//   } catch (error) {
//     console.error("GEMINI CHAT ERROR FULL:", error);

//     res.status(500).json({
//       error: error?.message || "Gemini AI error",
//     });
//   }
// });

// export default router;
