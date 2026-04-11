import express from "express";
import Chat from "../models/Chat.js";
import { GoogleGenAI } from "@google/genai"; 
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
    console.error(" CHAT ERROR FULL:", error);
    res.status(500).json({
      error: error?.message || " AI error",
    });
  }
});

export default router;


