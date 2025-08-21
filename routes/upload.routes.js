import { Router } from "express";
import multer from "multer";
import uploadController from "../controllers/upload.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("file"), uploadController.uploadImage);

export default router;
