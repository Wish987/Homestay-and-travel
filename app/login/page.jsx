import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      <section className="flex items-center justify-center px-6 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-amber-600 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Sign in to continue your journey
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 border border-gray-300 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-4 border border-gray-300 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
            Send OTP
          </button>

          <div className="flex items-center my-8">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full border border-gray-300 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="h-6"
            />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-gray-400 text-sm mt-8">
            Secure login powered by OTP and Google Authentication
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
