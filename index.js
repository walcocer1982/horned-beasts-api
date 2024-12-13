import express from "express";
import dotenv from "dotenv/config";
import beastsRouter from "./routes/beasts.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
// Usa el router
app.use("/api", beastsRouter);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
