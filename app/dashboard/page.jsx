"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HomestayCard from "../../components/HomestayCard";
import HomestayForm from "../../components/HomestayForm";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";
import Toast from "../../components/ui/Toast";
import useAuth from "../../hooks/useAuth";
import { getHomestays, createHomestay, updateHomestay, deleteHomestay } from "../../services/homestayService";

export default function Dashboard() {
  const router = useRouter();
  const { token, user, loading: authLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [homestays, setHomestays] = useState([]);
  const [error, setError] = useState("");
  const [activeHomestay, setActiveHomestay] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadHomestays = useCallback(async () => {
    setError("");
    setLoading(true);

    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      const data = await getHomestays(token);
      setHomestays(data);
    } catch (err) {
      setError(err.message || "Unable to fetch homestays.");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadHomestays();
    }
  }, [authLoading, isAuthenticated, loadHomestays, router]);

  const resetForm = useCallback(() => {
    setActiveHomestay(null);
    setFormValues({
      name: "",
      location: "",
      price: "",
      image: "",
      description: "",
    });
    setFormErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Name is required.";
    if (!formValues.location.trim()) errors.location = "Location is required.";
    if (!formValues.price || Number(formValues.price) <= 0) errors.price = "Price must be greater than 0.";
    if (!formValues.image.trim()) errors.image = "Image URL is required.";
    return errors;
  }, [formValues]);

  const handleFormChange = useCallback((name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleEdit = useCallback((homestay) => {
    setActiveHomestay(homestay);
    setFormValues({
      name: homestay.name || "",
      location: homestay.location || "",
      price: homestay.price || "",
      image: homestay.image || "",
      description: homestay.description || "",
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback(async (homestay) => {
    if (!window.confirm(`Delete ${homestay.name}? This action cannot be undone.`)) return;

    try {
      setSubmitting(true);
      await deleteHomestay(homestay.id, token);
      setHomestays((current) => current.filter((item) => item.id !== homestay.id));
      setSuccessMessage("Homestay deleted successfully.");
      window.setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete homestay.");
    } finally {
      setSubmitting(false);
    }
  }, [token]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const payload = {
      ...formValues,
      price: Number(formValues.price),
    };

    setSubmitting(true);
    try {
      if (activeHomestay) {
        await updateHomestay(activeHomestay.id, payload, token);
        setHomestays((current) => current.map((item) => item.id === activeHomestay.id ? { ...item, ...payload } : item));
        setSuccessMessage("Homestay updated successfully.");
      } else {
        const newHomestay = await createHomestay(payload, token);
        setHomestays((current) => [newHomestay, ...current]);
        setSuccessMessage("Homestay created successfully.");
      }
      resetForm();
      window.setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save homestay.");
    } finally {
      setSubmitting(false);
    }
  }, [activeHomestay, formValues, resetForm, router, token, validateForm]);

  const authToken = useMemo(() => token, [token]);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-amber-400 uppercase tracking-[0.3em] font-semibold mb-2">Dashboard</p>
                <h1 className="text-4xl font-extrabold text-white">Manage Homestays & AI Access</h1>
                <p className="text-slate-400 mt-2 max-w-2xl">Add new stays, update details, delete listings, and access AI planning support from one central dashboard.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-slate-700 px-6 py-5 shadow-lg">
                <p className="text-slate-400 text-sm">Welcome back</p>
                <p className="text-white font-semibold">{user?.email || "Authenticated user"}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 border border-slate-700 p-6">
                <p className="text-slate-400 text-sm">Profile</p>
                <p className="mt-2 text-white font-semibold">{user?.email || "No profile available"}</p>
                <p className="mt-1 text-slate-500 text-sm">User ID: {user?.id || "-"}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 border border-slate-700 p-6">
                <p className="text-slate-400 text-sm">AI Shortcut</p>
                <a
                  href="/ai"
                  className="mt-3 inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-600 transition"
                >
                  Open AI Planner
                </a>
              </div>
            </div>
            {successMessage && <div className="mt-6 rounded-3xl bg-emerald-500/15 border border-emerald-500/20 p-4 text-emerald-200">{successMessage}</div>}
            {error && <div className="mt-6 rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-red-200">{error}</div>}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Create / Edit Homestay</h2>
              <HomestayForm
                values={formValues}
                errors={formErrors}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                submitLabel={activeHomestay ? "Update Homestay" : "Add Homestay"}
                onCancel={activeHomestay ? resetForm : null}
              />
            </div>
          </div>

          <div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
              <h2 className="text-3xl font-semibold text-white mb-4">Homestay List</h2>
              {loading ? (
                <Loading />
              ) : error ? (
                <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-6 text-red-200">{error}</div>
              ) : homestays.length === 0 ? (
                <EmptyState
                  title="No Homestays Available"
                  description="Add your first homestay using the form on the left to display premium listings here."
                />
              ) : (
                <div className="grid gap-6">
                  {homestays.map((homestay) => (
                    <HomestayCard
                      key={homestay.id}
                      homestay={homestay}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

