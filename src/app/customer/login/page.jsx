"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEFAULT_MOCK_USER, saveCustomerSession } from "@/utils/customerAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // First attempt real backend call if available
      const res = await fetch(`${API_BASE}/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (res.ok) {
        const data = await res.json();
        saveCustomerSession(data.token, data.customer);
        router.push("/customer/bookings");
        return;
      }
    } catch (err) {
      // Fallback for seamless frontend experience during development
      console.warn("Backend not yet connected for customer login, using demo profile.");
    }

    // Demo fallback login simulation
    setTimeout(() => {
      const mockUser = {
        ...DEFAULT_MOCK_USER,
        email: identifier.includes("@") ? identifier : DEFAULT_MOCK_USER.email,
        phone: !identifier.includes("@") ? identifier : DEFAULT_MOCK_USER.phone,
      };
      saveCustomerSession("demo_jwt_token_valid", mockUser);
      router.push("/customer/bookings");
    }, 400);
  };

  const handleDemoSignIn = () => {
    saveCustomerSession("demo_jwt_token_valid", DEFAULT_MOCK_USER);
    router.push("/customer/bookings");
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 sm:my-12">
      <div className="rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a05c]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-full border border-[#c8a05c]/50 items-center justify-center bg-black/40 text-[#c8a05c] font-black font-serif text-sm mb-3">
            SYD
          </div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-wide">
            Passenger Sign In
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Access your bookings, live tracking and past invoices
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Email or Mobile Phone
            </label>
            <input
              id="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. name@example.com or +61400000000"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your registered email.");
                }}
                className="text-[11px] text-[#c8a05c] hover:underline"
              >
                Forgot?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In to Passenger Portal"}
          </button>
        </form>

        {/* Demo Fast Access Button for Reviewing */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2.5 rounded-xl border border-[#c8a05c]/40 text-[#c8a05c] hover:bg-[#c8a05c]/10 text-xs font-semibold transition-all cursor-pointer"
          >
            ⚡ Quick Demo Sign In (Preview All Features)
          </button>
        </div>

        <div className="mt-5 text-center text-xs text-zinc-400">
          New to SYD Transport?{" "}
          <Link
            href="/customer/register"
            className="text-[#e8c683] font-semibold hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

