import { useState } from "react";
import axios from "axios";
import ModalError from "./components/ModalError";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({ thai: "", francise: "" });
  const [modal, setModal] = useState(false);

  // Fonction pour traduire le texte en thaï et en français
  const handleTranslate = async () => {
    if (text.trim() === "") {
      setModal(true);
      return;
    }

    setResult({ thai: "Traduction en cours...", francise: "..." });

    try {
      const response = await axios.post("http://localhost:5000/translate", {
        text,
      });

      setResult(response.data);
    } catch (error) {
      console.error("Erreur avec le serveur :", error);
      setResult({ thai: "Erreur", francise: "..." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {modal && <ModalError onClose={() => setModal(false)} />}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Traducteur Français → Thaï
        </h1>
        <textarea
          placeholder="Écris ta phrase en français..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleTranslate}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
        >
          Traduire
        </button>
        {result.thai && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">
              🇹🇭 Thaï : {result.thai}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              🇫🇷 Français : {result.francise}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
