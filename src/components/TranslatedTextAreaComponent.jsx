import {
  ArrowRight,
  RefreshCw,
  Volume2,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";
function TranslatedTextAreaComponent ( {
  translatedText,
  handleCopyToClipboard,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="relative">
        <div className="w-full h-64 p-3 border border-gray-300 rounded-md overflow-y-auto bg-gray-50">
          {translatedText ? (
            <div>
              <div className="text-xl font-medium text-gray-800 mb-3">
                {translatedText}
              </div>
              {translatedText === "Guten Morgen!" && (
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Alternatives:
                  </div>
                  <div className="text-sm text-gray-700">
                    Guten Morgen, meine Damen und Herren
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 italic">
              Translation will appear here...
            </div>
          )}
        </div>
      </div>

      {/* Target Controls */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-600 hover:text-blue-600">
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleCopyToClipboard(translatedText)}
            className="p-2 text-gray-600 hover:text-blue-600">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <ThumbsDown className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslatedTextAreaComponent
