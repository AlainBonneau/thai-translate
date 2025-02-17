import { useState } from "react";
import { getThaiTranslation, franciserThai } from "./utils";

export default function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [francisedText, setFrancisedText] = useState("");

  const handleTranslate = async () => {
    if (text.trim() === "") return;

    const thaiTranslation = await getThaiTranslation(text);
    setTranslatedText(thaiTranslation);

    const francised = franciserThai(thaiTranslation);
    setFrancisedText(francised);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Traducteur Français → Thaï Francisé</h1>
        <textarea
          placeholder="Écris ta phrase en français..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleTranslate}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
        >
          Traduire
        </button>

        {translatedText && (
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800">
              Thaï : <span className="text-blue-500">{translatedText}</span>
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Francisé : <span className="text-green-500">{francisedText}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
