import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Travel & Homestay Logo"
            className="h-16 w-auto"
          />

          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-amber-700 tracking-wide">
              Travel & Homestay
            </h1>

            <p className="text-sm text-gray-500">
              AI Smart Travel Planner
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">

          <Link
            href="/"
            className="hover:text-amber-700 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-amber-700 transition-all duration-300"
          >
            About
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-amber-700 transition-all duration-300"
          >
            Dashboard
          </Link>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          <Link
            href="/login"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-md"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}
