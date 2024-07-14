import { Model, Types } from "mongoose";

type IComment = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  question: string;
}

type IAnnotation = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
}

export type IFile = {
  originalName: string;
  Url: string;
  mimeType: string;
  size: number;
  path: string;
  comment: IComment[];
  annotation: IAnnotation[];
}

export type IFileFilters = {
  searchTerm?: string;
  originalName?: string;
};

export type FileModel = Model<IFile, Record<string, unknown>>;
