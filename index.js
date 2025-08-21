import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

import indexRoutes from "./routes/index.routes.js";
app.use(indexRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ status: "error", error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is listening on port", PORT));
