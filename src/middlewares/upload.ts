import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uuid = uuidv4();
    cb(null, file.fieldname + "-" + uuid + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

export default upload;
