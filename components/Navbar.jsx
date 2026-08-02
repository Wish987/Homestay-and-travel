"use client";

import Link from "next/link";
import { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500 text-slate-950 font-bold">
              T
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-amber-700 tracking-wide">
                Travel & Homestay
              </h1>
              <p className="text-sm text-slate-500">AI Smart Travel Planner</p>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-700 font-medium">
          <Link href="/" className="hover:text-amber-700 transition-all duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-amber-700 transition-all duration-300">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-amber-700 transition-all duration-300">
            Dashboard
          </Link>
          <Link href="/ai" className="hover:text-amber-700 transition-all duration-300">
            AI
          </Link>
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="hidden sm:inline text-slate-500">{user?.email}</span>
              <button
                onClick={logout}
                className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
