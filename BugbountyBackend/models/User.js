import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    githubId: { type: String, default: null },
    googleId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
