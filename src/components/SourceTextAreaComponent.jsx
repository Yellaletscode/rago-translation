import { Copy, RefreshCw, Volume2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSourceText } from "../store/translationSlice";

function SourceTextAreaComponent({ handleClear, handleCopyToClipboard }) {
  const { translatedText, isTranslating, sourceText } = useSelector(
    (store) => store.translationState,
  );
  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="relative">
        <textarea
          value={sourceText}
          data-testid="source-textarea"
          onChange={(e) => dispatch(setSourceText(e.target.value))}
          placeholder="Enter text to translate..."
          className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {sourceText && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Source Controls */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:text-blue-600">
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleCopyToClipboard(sourceText)}
            className="p-2 text-gray-600 hover:text-blue-600">
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSourceText(translatedText)}
            className="p-2 text-gray-600 hover:text-blue-600">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {isTranslating && (
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SourceTextAreaComponent;
