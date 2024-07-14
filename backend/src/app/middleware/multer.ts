/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./src/uploads/");
  },
  
  filename: (req: any, file: any, cb: any) => {
    const fileName = Date.now() + "_" + file.originalname;
    file.originalname = fileName;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images and PDFs are allowed"));
    }
  },
});
