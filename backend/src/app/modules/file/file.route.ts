import express from "express";
import { deleteFile, getAllFile, getFile, updateFile, uploadFile } from "./file.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
import { upload } from "../../middleware/multer";


const router = express.Router();

router.post(
  '/upload',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR),
  upload.single('file'),
  uploadFile
)
router.get('/',
  //  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.VIEWER),
    getAllFile)
router.get('/:id', 
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR),
   getFile)
router.put(
  '/file/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR),
  updateFile
)
router.delete(
  '/file/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR),
  deleteFile
)

export const FileRoutes = router;