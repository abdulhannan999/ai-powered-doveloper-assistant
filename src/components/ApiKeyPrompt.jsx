import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ApiKeyPrompt() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("gemini-api-key") || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("gemini-api-key")) {
      navigate("/chat");
    }
  }, [apiKey, navigate]); // Redirect when apiKey changes

  const handleSubmit = () => {
    setIsSubmitting(true);
    setError("");
  
    if (!apiKey.trim()) {
      setError("API Key cannot be empty.");
      setIsSubmitting(false);
      return;
    }
  
    localStorage.setItem("gemini-api-key", apiKey);
    window.location.href = "/chat"; // Force a redirect
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && apiKey.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl overflow-hidden animate-fadeIn border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
            <h2 className="text-2xl font-bold">Enter Gemini API Key</h2>
            <p className="text-blue-100 text-sm">
              You need a Gemini API key to use this application.
            </p>
          </div>

          <div className="p-6">
            {error && (
              <div className="p-3 mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md border border-red-300 dark:border-red-700 animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your Gemini API key"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !apiKey.trim()}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Don't have an API key?{" "}
                <a
                  href="https://ai.google.dev/gemini-api/docs/api-key"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Get one here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyPrompt;
