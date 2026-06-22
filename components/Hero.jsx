export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white min-h-[70vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Discover Your Perfect Stay
        </h1>

        <p className="mt-6 text-lg md:text-2xl opacity-90 max-w-3xl mx-auto">
          AI-powered travel planning with unique homestays
          and unforgettable experiences.
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            Explore Now
          </button>

          <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}