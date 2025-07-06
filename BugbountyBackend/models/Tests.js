import mongoose from "mongoose";
const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    totalQuestions: { type: Number, required: true },
    passingScore: { type: Number, required: true },
    certification: { type: [String], default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
