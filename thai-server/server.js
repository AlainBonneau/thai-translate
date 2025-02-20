import express from "express";
import cors from "cors";
import axios from "axios";
import translate from "translate";
import { transliterate } from "transliteration";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

// Configuration de Google Translate
translate.engine = "google";

// Fonction pour traduire et translittérer
async function translateAndRomanize(text) {
  try {
    const thaiText = await translate(text, { from: "fr", to: "th" });
    const romanizedText = transliterate(thaiText);

    return { thai: thaiText, francise: romanizedText };
  } catch (error) {
    console.error("Erreur avec la traduction :", error);
    return { thai: "Erreur", francise: "..." };
  }
}

app.get("/", (req, res) => {
  res.send("Api de traduction Thailandais - Français");
});

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Texte manquant" });
  }

  const result = await translateAndRomanize(text);
  return res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
