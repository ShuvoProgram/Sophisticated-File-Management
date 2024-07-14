/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileSearchableFields } from "./file.constant";
import { IFileFilters } from "./file.interface";
import File from "./file.model";

export const createFile = async (newFile: any) => {
  return await File.create(newFile);
};

export const getFile = async (filters: IFileFilters) => {
   const { searchTerm, ...filtersData } = filters;

   const andConditions = [];

   if (searchTerm) {
     andConditions.push({
       $or: fileSearchableFields.map((field) => ({
         [field]: {
           $regex: searchTerm,
           $options: "i",
         },
       })),
     });
   }

   if (Object.keys(filtersData).length) {
     andConditions.push({
       $and: Object.entries(filtersData).map(([field, value]) => ({
         [field]: value,
       })),
     });
   }

   const whereConditions =
     andConditions.length > 0 ? { $and: andConditions } : {};

   const result = await File.find(whereConditions);

   return result;
};

export const getFileById = async (fileId: string) => {
  return await File.findById(fileId);
};

export const updateFileById = async (fileId: string, update: any) => {
  return await File.findByIdAndUpdate(fileId, update, { new: true });
};

export const deleteFileById = async (fileId: string) => {
  return await File.findByIdAndDelete(fileId);
};
