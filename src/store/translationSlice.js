import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sourceText: "",
  translatedText: "",
  isTranslating: false,
  error: "",
  isAutoTranslationEnabled: false,
};
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

const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setSourceText(state, action) {
      state.sourceText = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
    reset(state) {
      return initialState;
    },
    toggleAutoTranslation(state) {
      state.isAutoTranslationEnabled = !state.isAutoTranslationEnabled;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(translate.pending, (state, action) => {
        state.isTranslating = true;
        state.translatedText = "";
        state.error = "";
      })
      .addCase(translate.fulfilled, (state, action) => {
        state.isTranslating = false;
        state.translatedText = action.payload;
        state.error = "";
      })
      .addCase(translate.rejected, (state, action) => {
        state.isTranslating = false;
        state.error = action.payload ?? "There is some problem";
      });
  },
});

export const { clearError, reset, toggleAutoTranslation, setSourceText } =
  translationSlice.actions;
export default translationSlice.reducer;
