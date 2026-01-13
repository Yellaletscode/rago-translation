import React, { useState, useEffect } from "react";
import SourceTextAreaComponent from "./components/SourceTextAreaComponent";
import TranslatedTextAreaComponent from "./components/TranslatedTextAreaComponent";
import { ArrowRight } from "lucide-react";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  // const [sourceLanguage, setSourceLanguage] = useState("en");
  // const [targetLanguage, setTargetLanguage] = useState("de");

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

    setIsTranslating(true);
    setError(null);

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
      setError(err.message);
      setIsTranslating(false);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    const result = await translateText(sourceText);
    setTranslatedText(result);
  };

  // const handleSwapLanguages = () => {
  //   setSourceLanguage(targetLanguage);
  //   setTargetLanguage(sourceLanguage);
  //   setSourceText(translatedText);
  //   setTranslatedText(sourceText);
  // };

  const handleClear = () => {
    setSourceText("");
    setTranslatedText("");
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show feedback (could add toast notification in a real app)
      console.log("Copied to clipboard");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Translation</h1>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <select
              value="en"
              // onChange={(e) => setSourceLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled>
              <option value="en">English</option>
            </select>
            <button
              // onClick={handleSwapLanguages}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowRight className="w-5 h-5 rotate-90" />
            </button>
            <select
              // value={targetLanguage}
              // onChange={(e) => setTargetLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Automatic</span>
          </div>
        </div>

        {/* Translation Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Source Text Area */}

          <SourceTextAreaComponent
            handleClear={handleClear}
            isTranslating={isTranslating}
            setSourceText={setSourceText}
            sourceText={sourceText}
            handleCopyToClipboard={handleCopyToClipboard}
            translatedText={translatedText}
          />
          {/* Translated Text Area */}
          <TranslatedTextAreaComponent
            handleCopyToClipboard={handleCopyToClipboard}
            translatedText={translatedText}
          />
          <button onClick={handleTranslate}>translate</button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
