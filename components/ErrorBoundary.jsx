"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Captured error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6 py-10">
          <div className="bg-white/95 text-slate-900 rounded-3xl shadow-2xl p-10 max-w-3xl text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-600 mb-6">An unexpected error occurred while loading this section. Please refresh the page or try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-500 text-white px-6 py-3 rounded-2xl hover:bg-amber-600 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
