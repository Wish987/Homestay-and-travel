import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-white">
          Welcome Back, Explorer ✈️
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Discover luxury stays and unforgettable journeys.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition">
            Plan a Trip
          </button>

          <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Explore Stays
          </button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-white mb-8">
          Popular Destinations
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-600">Goa</h3>
            <p className="text-gray-600 mt-3">Beach paradise and nightlife.</p>
            <p className="mt-4 font-semibold">From ₹4,999</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-600">Ooty</h3>
            <p className="text-gray-600 mt-3">Beautiful hills and nature.</p>
            <p className="mt-4 font-semibold">From ₹3,499</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-600">Manali</h3>
            <p className="text-gray-600 mt-3">Snowy mountains and valleys.</p>
            <p className="mt-4 font-semibold">From ₹5,499</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-600">Kerala</h3>
            <p className="text-gray-600 mt-3">Backwaters and resorts.</p>
            <p className="mt-4 font-semibold">From ₹4,299</p>
          </div>

        </div>
      </section>

      {/* Featured Homestays */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white mb-10">
          Featured Luxury Stays
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="Goa Villa"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">Ocean Paradise Villa</h3>
              <p className="text-gray-600 mt-3">
                Private pool • Sea view • Free breakfast
              </p>

              <p className="mt-4 text-amber-600 font-bold">
                ₹7,999 / night
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt="Ooty Cottage"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">
                Mountain Retreat Cottage
              </h3>

              <p className="text-gray-600 mt-3">
                Fireplace • Garden view • WiFi
              </p>

              <p className="mt-4 text-amber-600 font-bold">
                ₹4,999 / night
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
              alt="Manali Chalet"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold">
                Himalayan Escape Chalet
              </h3>

              <p className="text-gray-600 mt-3">
                Balcony • Mountain view • Breakfast
              </p>

              <p className="mt-4 text-amber-600 font-bold">
                ₹6,499 / night
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* AI Assistant */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-xl text-center">

          <h2 className="text-4xl font-bold text-amber-600">
            AI Travel Assistant 🤖
          </h2>

          <p className="text-gray-600 mt-4">
            Ask AI to suggest destinations and create itineraries.
          </p>

          <button className="mt-8 bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition">
            Start Planning
          </button>

        </div>
      </section>

      <Footer />
    </div>
  );
}

