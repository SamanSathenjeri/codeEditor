import mongoose from "mongoose";
import { File } from "../db/fileModel.js";
import { User } from "../db/userModel.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    collaborators: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    filepaths: {
      type: [File]
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
