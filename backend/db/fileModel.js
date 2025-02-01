import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    path: {
        type: String,
        required: true
    },
    s3_key: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

export const File = mongoose.model("Project", fileSchema);