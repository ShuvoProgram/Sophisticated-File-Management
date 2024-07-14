/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import * as fileService from "../file/file.service";
import httpStatus from "http-status";

import { fileFilterableFields } from "./file.constant";
import { uploadMultipleFiles } from "../../../shared/uploadFile";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const files = req.file;
    const fileField = [files];
    const fileUrls = await uploadMultipleFiles(fileField);
    const newFile = {
      originalName: req.file.originalname,
      Url: fileUrls[0],
      mimeType: req.file.mimetype,
      comment: req.body.comment,
      annotation: req.body.annotation,
    };

    await fileService.createFile(newFile);
    res.status(201).json(`Successfully Upload File!`);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllFile = async (req: Request, res: Response) => {
  try {
     const filters = pick(req.query, fileFilterableFields);
    const file = await fileService.getFile(filters);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: "Fill Fetched successfully!",
       data: file,
     });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const getFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const file = await fileService.getFileById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const update = req.body;

    const updatedFile = await fileService.updateFileById(fileId, update);

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(updatedFile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const deletedFile = await fileService.deleteFileById(fileId);

    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
