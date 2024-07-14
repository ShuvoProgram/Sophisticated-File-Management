import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Extend IncomingMessage to include file and files properties
interface NextApiRequestWithFile extends IncomingMessage {
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), "public/uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname}`);
    },
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req: NextApiRequestWithFile, res: NextApiResponse) => {
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;