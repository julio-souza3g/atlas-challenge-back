import mongoose, { Document, Schema } from "mongoose";

type Contact = Document & {};

const contactSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  company: {
    type: String,
  },
}, { timestamps: true })

export default mongoose.model<Contact>("Contact", contactSchema)