import { Schema, model } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>({
  originalName: { type: String, required: true },
  Url: { type: String, required: true },
  mimeType: { type: String, required: true },
  comment: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      question: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  annotation: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const File = model<IFile>("File", fileSchema);
export default File;
