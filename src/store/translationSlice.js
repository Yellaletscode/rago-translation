// src/store/translationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const translate = createAsyncThunk(
  "translation/translate",
  async (text, { rejectWithValue }) => {
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;

    try {
      const response = await fetch(
        "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "en",
            to: "de",
            text,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data?.trans) throw new Error("Invalid translation response");

      return data.trans;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    translatedText: "",
    isTranslating: false,
    error: "",
  },
  reducers: {
    clearError(state) {
      state.error = "";
    },
    reset(state) {
      return { ...state, translatedText: "", error: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(translate.pending, (state) => {
        state.isTranslating = true;
        state.error = "";
      })
      .addCase(translate.fulfilled, (state, action) => {
        state.isTranslating = false;
        state.translatedText = action.payload;
      })
      .addCase(translate.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload ?? "Translation failed";
      });
  },
});

export const { clearError, reset } = translationSlice.actions;
export default translationSlice.reducer;
