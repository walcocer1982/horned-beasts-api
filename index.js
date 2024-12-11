import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Horned Beasts API de Walther");
});
app.get("/test", (req, res) => {
    res.json({
        name: "Walther",
        date: "2024-10-28",
        timestamp: 1730258872,
    });
});
app.get("/enter", (req, res)=>{
    res.send("Hola Walther")
}

)
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
