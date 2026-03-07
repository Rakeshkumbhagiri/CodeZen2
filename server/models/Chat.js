import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  messages: [
    {
      role: String,
      content: String
    }
  ]
});

export default mongoose.model("Chat", ChatSchema);
