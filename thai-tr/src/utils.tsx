const thaiToFranciseMap = {
    "ก": "k", "ข": "kh", "ค": "kh", "ฆ": "kh",
    "จ": "tch", "ฉ": "ch", "ช": "ch", "ซ": "s", "ฌ": "ch",
    "ญ": "y", "ฎ": "d", "ฏ": "t", "ฐ": "th", "ฑ": "th", "ฒ": "th",
    "ณ": "n", "ด": "d", "ต": "t", "ถ": "th", "ท": "th", "ธ": "th",
    "น": "n", "บ": "b", "ป": "p", "ผ": "ph", "ฝ": "f", "พ": "ph", "ฟ": "f",
    "ม": "m", "ย": "y", "ร": "r", "ล": "l", "ว": "w", "ศ": "s", "ษ": "s", "ส": "s",
    "ห": "h", "ฬ": "l", "อ": "o", "ฮ": "h"
  };
  
  export async function getThaiTranslation(text: string): Promise<string> {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|th`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Erreur lors de la traduction :", error);
      return "Erreur de traduction";
    }
  }
  
  export function franciserThai(text: string): string {
    return text.split("").map(char => thaiToFranciseMap[char] || char).join("");
  }
  