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
    bio: { type: String, default: "", required: true },
    location: { type: String, default: "", required: true },
    portfolio: { type: String, default: "", required: true },
    github: { type: String, default: "", required: true },
    twitter: { type: String, default: "", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
