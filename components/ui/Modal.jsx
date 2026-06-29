"use client";

import { useEffect } from "react";

/**
 * Modal Component
 * Props:
 * isOpen: boolean
 * onClose: function
 * title: string
 * children: ReactNode
 */

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}