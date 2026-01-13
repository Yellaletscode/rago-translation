import { createStore } from "redux";

const initialState = {
  translatedText: "",
  isTranslating: false,
  error: "",
};

export default function translationReducer(state = initialState, action) {
  switch (action.type) {
    case "translate/translateText": {
      return {
        ...state,
        translatedText: action.payload,
        isTranslating: !state.isTranslating,
      };
    }
    case "translate/isTranslating": {
      return { ...state, isTranslating: !state.isTranslating };
    }
    case "translate/error": {
      return { ...state, error: action.payload };
    }
    case "translate/reset": {
      return initialState;
    }

    default:
      return state;
  }
}

export function translate(text) {
  // return { type: "translate/translateText", payload: translatedText };

  return async function (dispatch, getState) {
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;
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
    dispatch(isTranslating());
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data && data.trans) {
        dispatch({ type: "translate/translateText", payload: data.trans });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(err);

      dispatch(translationError(err.message));
      dispatch(isTranslating());

    } 
  };
}
export function isTranslating() {
  return { type: "translate/isTranslating" };
}
export function translationError(err) {
  return { type: "translate/error", payload: err };
}
export function reset() {
  return { type: "translate/reset" };
}
