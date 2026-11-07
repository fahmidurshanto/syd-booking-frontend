"use client";

import { useEffect, useState } from "react";
import { DEFAULT_MOCK_USER, getStoredCustomer, saveCustomerSession } from "@/utils/customerAuth";

export default function CustomerProfilePage() {
  const [customer, setCustomer] = useState(DEFAULT_MOCK_USER);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultPassengers, setDefaultPassengers] = useState(2);
  const [defaultLuggage, setDefaultLuggage] = useState(2);
  const [preferredVehicleType, setPreferredVehicleType] = useState("Chauffeur");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = getStoredCustomer() || DEFAULT_MOCK_USER;
    setCustomer(stored);
    setFullName(stored.fullName || "");
    setEmail(stored.email || "");
    setPhone(stored.phone || "");
    if (stored.preferences) {
      setDefaultPassengers(stored.preferences.defaultPassengers || 2);
      setDefaultLuggage(stored.preferences.defaultLuggage || 2);
      setPreferredVehicleType(stored.preferences.preferredVehicleType || "Chauffeur");
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...customer,
      fullName,
      email,
      phone,
      preferences: {
        ...customer.preferences,
        defaultPassengers,
        defaultLuggage,
        preferredVehicleType,
      },
    };
    saveCustomerSession("demo_jwt_token_valid", updated);
    setCustomer(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#c8a05c]">
          Account Settings
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
          Passenger Profile &amp; Preferences
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Save your personal details to enable fast 1-click booking on all transfers.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
          ✓ Profile and booking defaults saved successfully!
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="rounded-2xl bg-zinc-900/80 border border-white/10 p-6 sm:p-8 space-y-6 backdrop-blur-md"
      >
        {/* Contact info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
            Personal Information
          </h3>

          <div>
            <label htmlFor="p-name" className="block text-xs text-zinc-300 font-medium mb-1">
              Full Name
            </label>
            <input
              id="p-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#c8a05c] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="p-email" className="block text-xs text-zinc-300 font-medium mb-1">
                Email Address
              </label>
              <input
                id="p-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#c8a05c] outline-none"
              />
            </div>
            <div>
              <label htmlFor="p-phone" className="block text-xs text-zinc-300 font-medium mb-1">
                Mobile Phone
              </label>
              <input
                id="p-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:border-[#c8a05c] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 1-Click Booking Defaults */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
            1-Click Booking Defaults
          </h3>
          <p className="text-xs text-zinc-400">
            These preferences will automatically populate the booking form when you reserve a ride.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="def-pass" className="block text-xs text-zinc-300 font-medium mb-1">
                Default Passengers
              </label>
              <select
                id="def-pass"
                value={defaultPassengers}
                onChange={(e) => setDefaultPassengers(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-[#c8a05c] outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-zinc-900">
                    {n} {n === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="def-lugg" className="block text-xs text-zinc-300 font-medium mb-1">
                Default Luggage
              </label>
              <select
                id="def-lugg"
                value={defaultLuggage}
                onChange={(e) => setDefaultLuggage(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-[#c8a05c] outline-none"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-zinc-900">
                    {n} {n === 1 ? "Bag" : "Bags"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="def-veh" className="block text-xs text-zinc-300 font-medium mb-1">
                Preferred Vehicle
              </label>
              <select
                id="def-veh"
                value={preferredVehicleType}
                onChange={(e) => setPreferredVehicleType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:border-[#c8a05c] outline-none"
              >
                <option value="Chauffeur" className="bg-zinc-900">
                  Chauffeur
                </option>
                <option value="Taxi" className="bg-zinc-900">
                  Taxi
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer"
          >
            Save Profile &amp; Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

