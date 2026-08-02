"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Toast from "../../components/ui/Toast";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const router = useRouter();
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      setSuccess("");

      if (!email.trim() || !password.trim()) {
        setError("Email and password are required.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords must match.");
        return;
      }

      setLoading(true);
      try {
        await register({ email, password });
        setSuccess("Registration successful. You can now log in.");
        window.setTimeout(() => router.push("/login"), 1500);
      } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [confirmPassword, email, password, register, router]
  );

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
          <h1 className="text-4xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-slate-400 mb-8">Register to access the dashboard, homestay management, and AI assistant.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            {success && <p className="text-emerald-400">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-500 text-slate-950 px-6 py-4 font-semibold hover:bg-amber-600 transition disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {loading && <Loading />}
          {success && <Toast message="Registration successful. Redirecting to login..." />}
        </section>
      </main>
      <Footer />
    </div>
  );
}
