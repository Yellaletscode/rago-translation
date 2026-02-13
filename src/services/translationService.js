import { createAsyncThunk } from "@reduxjs/toolkit";

export const translate = createAsyncThunk(
  "translation/translate",
  async (text, { rejectWithValue, getState }) => {
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;
    const URL =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
    const state = getState();
    console.log(state.translationState.sourceText);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "en",
          to: "de",
          text: state.translationState.sourceText,
        }),
      });

      if (!response.ok) throw new Error(`failed ${response.status}`);
      const data = await response.json();

      if (!data.trans) throw new Error("unsuported response");

      return data.trans;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
