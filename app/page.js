"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { getHomestays } from "../services/homestayService";

export default function Home() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setError("");
      setLoading(true);
      try {
        const data = await getHomestays();
        setHomestays(data);
      } catch (err) {
        setError(err.message || "Unable to load homestays.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-3xl p-6 shadow-xl text-slate-900">
            <h2 className="text-3xl font-bold text-amber-600">{homestays.length}</h2>
            <p className="text-slate-500">Available Homestays</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl text-slate-900">
            <h2 className="text-3xl font-bold text-amber-600">3+</h2>
            <p className="text-slate-500">Destinations</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl text-slate-900">
            <h2 className="text-3xl font-bold text-amber-600">24/7</h2>
            <p className="text-slate-500">AI Support</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl text-slate-900">
            <h2 className="text-3xl font-bold text-amber-600">Secure</h2>
            <p className="text-slate-500">JWT Auth</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-5xl font-bold">Featured Homestays</h2>
            <p className="text-slate-400 mt-3 max-w-xl">Explore the latest homestays loaded from the backend API with secure dashboard controls.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-slate-950 font-semibold shadow-lg hover:bg-amber-600 transition">
              Manage Listings
            </Link>
            <Link href="/ai" className="inline-flex items-center rounded-full border border-white/20 bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 transition">
              Try AI Planner
            </Link>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-8 text-red-200 text-center">{error}</div>
        ) : homestays.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-500 bg-white/10 p-10 text-center text-slate-300">
            <h3 className="text-2xl font-semibold mb-3">No Homestays Available</h3>
            <p>We are updating our listings. Please check back later or add a listing from your dashboard.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homestays.map((stay) => (
              <div key={stay.id} className="group overflow-hidden rounded-3xl bg-white shadow-2xl transition hover:-translate-y-2">
                <img src={stay.image || "/logo.png"} alt={stay.name} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900">{stay.name}</h3>
                  <p className="mt-3 text-slate-600">{stay.description}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                    <span>{stay.location}</span>
                    <span className="font-semibold text-amber-600">₹{stay.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

    </div>
  );
}