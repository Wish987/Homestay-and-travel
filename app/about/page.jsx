import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <div className="bg-slate-950 min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-extrabold text-white mb-8">
          About Travel & Homestay
        </h1>

        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-9">
          Travel & Homestay is an AI-powered platform that helps
          travelers discover unique homestays and plan memorable
          journeys with smart recommendations.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-amber-600">
              AI
            </h2>

            <p className="mt-4 text-gray-600">
              Smart travel planning.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-amber-600">
              Stay
            </h2>

            <p className="mt-4 text-gray-600">
              Discover beautiful homestays.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-amber-600">
              Explore
            </h2>

            <p className="mt-4 text-gray-600">
              Create unforgettable journeys.
            </p>
          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}