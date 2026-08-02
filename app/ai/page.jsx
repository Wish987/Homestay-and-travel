"use client";

import { useCallback, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import { generateItinerary } from "../../services/aiService";

export default function AIPage() {
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("travel_token") : null;

  const handleGenerate = useCallback(async () => {
    setError("");
    setResult(null);

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);
    try {
      const data = await generateItinerary(destination.trim(), token);
      setResult(data.itinerary);
    } catch (err) {
      setError(err.message || "Unable to generate itinerary.");
    } finally {
      setLoading(false);
    }
  }, [destination, token]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const handleReset = useCallback(() => {
    setDestination("");
    setResult(null);
    setError("");
  }, []);

  const buttonDisabled = loading;
  const resultCard = useMemo(() => {
    if (!result) return null;
    return (
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-slate-200 mt-8">
        <h2 className="text-3xl font-semibold text-slate-900 mb-4">AI Travel Plan</h2>
        <p className="text-slate-600 whitespace-pre-line leading-7">{result}</p>
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleCopy}
            className="bg-amber-500 text-white px-5 py-3 rounded-full hover:bg-amber-600 transition"
          >
            {copied ? "Copied" : "Copy Result"}
          </button>
          <button
            onClick={handleReset}
            className="border border-slate-300 text-slate-700 px-5 py-3 rounded-full hover:bg-slate-100 transition"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }, [result, copied, handleCopy, handleReset]);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="bg-white/5 border border-white/10 rounded-[2rem] p-10 shadow-2xl backdrop-blur-lg">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-amber-400 uppercase tracking-[0.3em] font-semibold mb-4">AI Travel Assistant</p>
              <h1 className="text-5xl font-extrabold text-white mb-6">Create a smarter travel itinerary in seconds.</h1>
              <p className="text-slate-300 leading-8">
                Enter your destination, and the AI assistant will generate a polished itinerary with local insights, premium recommendations, and travel planning tips.
              </p>
            </div>
            <div className="bg-slate-900/90 rounded-[2rem] p-8 border border-slate-700 shadow-xl">
              <label className="block text-sm text-slate-400 mb-3">Destination</label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Goa, Ooty, Kerala"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  disabled={buttonDisabled}
                  onClick={handleGenerate}
                  className="rounded-full bg-amber-500 text-white px-7 py-3 font-semibold hover:bg-amber-600 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
                <button
                  onClick={handleReset}
                  className="rounded-full border border-slate-700 bg-slate-900 px-7 py-3 text-slate-100 hover:bg-slate-800 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {loading && <Loading />}
          {resultCard}
        </section>
      </main>
      <Footer />
    </div>
  );
}
