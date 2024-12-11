
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Usar la variable PORT definida en el archivo .env o un valor por defecto
const port = process.env.PORT || 3001;

// Configurar la ruta principal
app.get("/", (req, res) => {
    res.send("Horned Beasts API de Walther");
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
