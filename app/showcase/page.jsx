"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../../components/ui";

export default function Showcase() {

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Component Showcase
      </h1>

      {/* Buttons */}
      <section className="mb-10">
        <h2 className="text-3xl mb-5">Buttons</h2>

        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>

          <Button variant="secondary">Secondary</Button>

          <Button variant="outline">Outline</Button>
        </div>
      </section>

      {/* Input */}
      <section className="mb-10 bg-white p-6 rounded-3xl">
        <h2 className="text-3xl text-black mb-5">
          Input
        </h2>

        <Input
          label="Email"
          placeholder="Enter your email"
        />
      </section>

      {/* Modal */}
      <section className="mb-10">
        <Button onClick={() => setShowModal(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Travel & Homestay"
        >
          <p className="text-gray-700">
            Welcome to our luxury travel platform.
          </p>
        </Modal>
      </section>

      {/* Toast */}
      <section className="mb-10">
        <Button
          variant="secondary"
          onClick={() => {
            setShowToast(true);

            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }}
        >
          Show Toast
        </Button>

        {showToast && (
          <Toast message="Booking Successful!" />
        )}
      </section>

      {/* Loader */}
      <section>
        <h2 className="text-3xl mb-5">
          Loader
        </h2>

        <Loader />
      </section>

    </div>
  );
}