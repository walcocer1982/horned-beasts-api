import express from "express";
import beastsData from "../data/horned-beast.json" assert { type: "json" };

const router = express.Router();

// Ruta para devolver los datos de los beasts
router.get("/beasts", (req, res) => {
    res.json(beastsData);
});
router.get("/beasts/:id", (req, res) => {
    // Obtener el parámetro dinámico id de la URL
    const { id } = req.params;
    const singleBeast = beastsData.find((beast) => beast.id === parseInt(id));
    
    res.json(singleBeast);
});
export default router;
