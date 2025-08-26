import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

