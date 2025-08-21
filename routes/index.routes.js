import { Router } from "express";

const router = Router();

import uploadRoutes from "./upload.routes.js";

router.use("/upload/", uploadRoutes);

export default router;
