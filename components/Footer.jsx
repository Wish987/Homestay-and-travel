export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 mt-20 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Logo */}
        <div className="mb-4">
          <img src="/logo.png" alt="Travel & Homestay logo" className="h-16 mx-auto" />
        </div>

        {/* Tagline */}
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Smart travel planning for modern explorers. Discover unique
          homestays and unforgettable experiences with AI assistance.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">

          <a
            href="#"
            className="hover:text-blue-400 transition duration-300"
          >
            About
          </a>

          <a
            href="#"
            className="hover:text-blue-400 transition duration-300"
          >
            Contact
          </a>

          <a
            href="#"
            className="hover:text-blue-400 transition duration-300"
          >
            Privacy Policy
          </a>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-500">
            © 2026 Travel & Stay. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
}