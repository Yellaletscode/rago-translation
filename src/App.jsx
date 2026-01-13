import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SourceTextAreaComponent from "./components/SourceTextAreaComponent";
import TranslatedTextAreaComponent from "./components/TranslatedTextAreaComponent";
import {
  translate
} from "./store/translationSlice";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const error = useSelector((state) => state.translationState.error);

  const dispatch = useDispatch();

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    dispatch(translate(sourceText));
  };



  const handleClear = () => {
    setSourceText("");
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Translation</h1>
        </div>

        {/* Language slection default english */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <select
              value="en"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Source language in this case english */}
          <SourceTextAreaComponent
            handleClear={handleClear}
            setSourceText={setSourceText}
            sourceText={sourceText}
            handleCopyToClipboard={handleCopyToClipboard}
          />
          {/* Translated language text area w/c is german */}
          <TranslatedTextAreaComponent
            handleCopyToClipboard={handleCopyToClipboard}
          />
          <button
            onClick={handleTranslate}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span>Translate</span>
            
          </button>
        </div>

        {/* Error message if there is any error */}
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
