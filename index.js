import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import indexRoutes from "./routes/index.routes.js";
app.use(indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is listening on port", PORT));
