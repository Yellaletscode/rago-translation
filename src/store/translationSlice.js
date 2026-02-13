import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { translate } from "../services/translationService";

const initialState = {
  sourceText: "",
  translatedText: "",
  isTranslating: false,
  error: "",
  isAutoTranslationEnabled: false,
};

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
      state.isTranslating = false;
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
