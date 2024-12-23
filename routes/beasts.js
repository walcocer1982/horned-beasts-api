import express from "express";
import beastsData from "../data/horned-beast.json" assert { type: "json" };
import { searchImages } from "../services/unsplash.js";
import { getArticleDescription } from "../services/wikipedia.js";

const router = express.Router();

// Ruta para devolver todos los datos de los beasts
router.get("/beasts", (req, res) => {
  res.json(beastsData);
});

// Ruta para devolver un beast específico por ID
router.get("/beasts/:id", (req, res) => {
  const { id } = req.params;
  const singleBeast = beastsData.find((beast) => beast.id === parseInt(id));

  if (singleBeast) {
    res.json(singleBeast);
  } else {
    res.status(404).json({ error: "Beast not found" });
  }
});

// Ruta para devolver los primeros 3 beasts enriquecidos
router.get("/beasts/enriched", async (req, res) => {
  try {
    const limitedBeasts = beastsData.slice(0, 3);

    const enrichedBeasts = await Promise.all(
      limitedBeasts.map(async (beast) => {
        const alternativeImage = await searchImages(beast.title);
        const wikiDescription = await getArticleDescription(beast.title);

        return {
          ...beast,
          alternative_image: alternativeImage || "No alternative image found.",
          wiki_description: wikiDescription || "No description found.",
        };
      })
    );

    res.json(enrichedBeasts);
  } catch (error) {
    console.error("Error enriching beasts:", error);
    res.status(500).json({ error: "Error processing request", details: error.message });
  }
});

// Ruta para devolver un beast enriquecido por ID
router.get("/beasts/enriched/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const beast = beastsData.find((beast) => beast.id === parseInt(id));

    if (!beast) {
      return res.status(404).json({
        error: "Beast not found",
        details: `No beast with ID ${id}`,
      });
    }

    const alternativeImage = await searchImages(beast.title);
    const wikiDescription = await getArticleDescription(beast.title);

    const enrichedBeast = {
      ...beast,
      alternative_image: alternativeImage || "No alternative image found.",
      wiki_description: wikiDescription || "No description found.",
    };

    res.json(enrichedBeast);
  } catch (error) {
    console.error("Error enriching beast:", error);
    res.status(500).json({ error: "Error processing request", details: error.message });
  }
});

export default router;
