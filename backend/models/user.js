import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    googleId: { type: String, default: null },
    profilePicture: { type: String, default: null },
    // loginMethod: { type: String, enum: ["google", "manual"], required: true },
    loginMethod: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("user", userSchema);

export default User;
