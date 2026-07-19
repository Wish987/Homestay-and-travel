"use client";

import { useState } from "react";

const AIPlanner = () => {
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!destination.trim()) {
      setError("Please enter a destination");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ destination: destination.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate travel guide");
        return;
      }

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "Failed to generate travel guide");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while connecting to the server. Make sure the backend is running on localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDestination("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🌍 AI Travel Planner</h1>
            <p className="text-gray-600">Get personalized travel guides powered by AI</p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleGenerate} className="mb-8">
            <div className="mb-4">
              <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">
                Destination
              </label>
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter a destination (e.g., Goa, Paris, Tokyo)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? "Generating..." : "Generate Guide"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-bold rounded-lg transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="inline-block">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 mt-4">Generating your travel guide...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-semibold">❌ Error</p>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          )}

          {/* Result Card */}
          {result && !loading && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-green-800 mb-1">✅ Your Travel Guide</h2>
                <p className="text-green-600">for <span className="font-semibold">{destination}</span></p>
              </div>
              <div className="prose prose-sm max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!result && !error && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Enter a destination to get started with your AI travel guide</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
