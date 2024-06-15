import multer, { Multer } from "multer";

const upload: Multer = multer({ storage: multer.memoryStorage() });

export default upload;
