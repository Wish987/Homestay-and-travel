"use client";

/**
 * Toast Component
 * Props:
 * message: string
 */

export default function Toast({ message }) {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50">
      {message}
    </div>
  );
}