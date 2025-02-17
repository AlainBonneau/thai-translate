import axios from "axios";

export async function translateAndRomanize(text: string, gender: string) {
  try {
    const response = await axios.post("http://localhost:5000/translate", {
      text,
      gender,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur avec le serveur backend :", error);
    return "Erreur de traduction. Vérifie que le backend fonctionne.";
  }
}
