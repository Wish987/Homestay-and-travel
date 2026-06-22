import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-950">

      <Navbar />

      <Hero />

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-blue-600">50+</h2>
            <p className="text-gray-600">Homestays</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-blue-600">1000+</h2>
            <p className="text-gray-600">Travelers</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-blue-600">20+</h2>
            <p className="text-gray-600">Destinations</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
            <p className="text-gray-600">AI Support</p>
          </div>

        </div>
      </section>

      {/* Featured Homestays */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Featured Homestays
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Card
            title="Mountain Retreat"
            description="Experience peaceful nature stays surrounded by nature."
          />

          <Card
            title="Beach Paradise"
            description="Enjoy relaxing coastal stays with stunning ocean views."
          />

        </div>

      </section>

      <Footer />

    </div>
  );
}