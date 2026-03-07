import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tutor name is required"],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
  }
  // {
  //   timestamps: true, // adds createdAt & updatedAt
  // }
);

// Force exact collection name: "DSA-Tutor"
const Tutor = mongoose.model("Tutor", tutorSchema, "DSA-Tutor");

export default Tutor;
