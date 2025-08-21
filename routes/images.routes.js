import { Router } from "express";
import imagesController from "../controllers/images.controller.js";

const router = Router();

router.get("/", imagesController.getAllImages);
router.delete("/soft/:id", imagesController.softDeleteImage);
router.delete("/hard/:id", imagesController.deleteImage);

export default router;
