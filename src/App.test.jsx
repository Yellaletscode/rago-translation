import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { translate } from "./store/translationSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import translationReducer from "./store/translationSlice";

import * as translationSlice from "./store/translationSlice";
test("renders the translation app title without crashing", () => {
  const store = configureStore({
    reducer: {
      translationState: translationReducer,
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const titleElement = screen.getByRole("heading", {
    name: /Translation/i,
    level: 1,
  });

  expect(titleElement).toBeInTheDocument();
});

test("renders the source textarea with correct placeholder", () => {
  const store = configureStore({
    reducer: {
      translationState: translationReducer,
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const textarea = screen.getByPlaceholderText(/Enter text to translate.../i);

  expect(textarea).toBeInTheDocument();
  expect(textarea).toHaveAttribute("placeholder", "Enter text to translate...");
});

test("updates source textarea value when typing", () => {
  const store = configureStore({
    reducer: {
      translationState: translationReducer,
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const textarea = screen.getByPlaceholderText(/Enter text to translate.../i);

  fireEvent.change(textarea, { target: { value: "Hello world" } });

  expect(textarea).toHaveValue("Hello world");
});

test("calls translate action when typing text (auto-translate)", async () => {
  const translateSpy = jest.spyOn(translationSlice, "translate");

  const store = configureStore({
    reducer: {
      translationState: translationReducer,
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const textarea = screen.getByPlaceholderText(/Enter text to translate.../i);

  fireEvent.change(textarea, { target: { value: "Hello world" } });

  await waitFor(
    () => {
      expect(translateSpy).toHaveBeenCalledTimes(1);
      expect(translateSpy).toHaveBeenCalledWith("Hello world");
    },
    { timeout: 1500 }
  );

  translateSpy.mockRestore();
});
