import { Router } from "express";

const router = Router();

import imagesRoutes from "./images.routes.js";
import uploadRoutes from "./upload.routes.js";

router.use("/images/", imagesRoutes);
router.use("/upload/", uploadRoutes);

export default router;
