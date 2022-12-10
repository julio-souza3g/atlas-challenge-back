import mongoose, { Document, Schema } from "mongoose";

type User = Document & {};

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model<User>("User", userSchema)