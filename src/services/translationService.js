import { useDispatch } from "react-redux";
import store, { isTranslating } from "../store/translationSlice";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;


const translateText = async (text) => {
  const url =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "google-translate113.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "en",
      to: "de",
      text: text,
    }),
  };
  if (!text.trim()) return "";
store.dispatch(isTranslating())
  // setIsTranslating(true);
  // setError(null);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data && data.trans) {
      return data.trans;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error(err);
    // setError(err.message);
    // setIsTranslating(false);
  } finally {
    // setIsTranslating(false);
  }
};

export default translateText
