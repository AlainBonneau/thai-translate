import { useState } from "react";
import axios from "axios";
import ModalError from "./components/ModalError";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/MyFooter";

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
    <div className="flex flex-col min-h-screen bg-customwhite-500">
      <MyNavbar />
      {modal && <ModalError onClose={() => setModal(false)} />}
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
        <div className="bg-customblue-500 shadow-xl rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-customwhite-500">
            Traducteur Français → Thaï
          </h1>
          <textarea
            placeholder="Écris ta phrase ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-customwhite-500 rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-customwhite-500"
          />
          <button
            onClick={handleTranslate}
            className="mt-4 bg-customred-500 text-white py-3 px-6 rounded-lg w-full font-semibold tracking-wide hover:bg-opacity-80 transition"
          >
            Traduire
          </button>
          {result.thai && (
            <div className="mt-6 p-4 bg-customwhite-500 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-customblue-500">
                🇹🇭 Thaï : {result.thai}
              </p>
              <p className="text-lg font-semibold text-customblue-500">
                🇫🇷 Français : {result.francise}
              </p>
            </div>
          )}
        </div>
      </div>
      <MyFooter />
    </div>
  );
}
