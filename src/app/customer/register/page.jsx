"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveCustomerSession } from "@/utils/customerAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const newCustomer = {
      id: "cust_" + Math.random().toString(36).substring(2, 9),
      fullName,
      email,
      phone,
      role: "passenger",
      preferences: {
        defaultPassengers: 2,
        defaultLuggage: 2,
        preferredVehicleType: "Chauffeur",
        favoritePlaces: [],
      },
    };

    try {
      const res = await fetch(`${API_BASE}/customer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (res.ok) {
        const data = await res.json();
        saveCustomerSession(data.token, data.customer);
        router.push("/customer/bookings");
        return;
      }
    } catch (err) {
      console.warn("Backend not yet connected for customer register, using local registration.");
    }

    // Local simulated registration
    setTimeout(() => {
      saveCustomerSession("demo_jwt_token_valid", newCustomer);
      router.push("/customer/bookings");
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 sm:my-12">
      <div className="rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-full border border-[#c8a05c]/50 items-center justify-center bg-black/40 text-[#c8a05c] font-black font-serif text-sm mb-3">
            SYD
          </div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-wide">
            Passenger Registration
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create an account for 1-click booking and trip management
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
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
            >
              Mobile Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +61 412 345 678"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/customer/login"
            className="text-[#e8c683] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

