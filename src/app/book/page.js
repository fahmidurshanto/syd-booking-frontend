"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookPage() {
  const [step, setStep] = useState(1); // 1 = Select Category, 2 = Pickup & Dropoff
  const [selectedCategory, setSelectedCategory] = useState("chauffeur");

  // Booking Form State
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("2026-10-27");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [flightNumber, setFlightNumber] = useState("");

  const handleContinueCategory = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!pickup.trim() || !dropoff.trim()) {
      alert("Please enter both pickup and drop-off locations.");
      return;
    }
    alert(
      `Trip Request Submitted!\nService: ${selectedCategory.toUpperCase()}\nPickup: ${pickup}\nDrop-off: ${dropoff}\nDate: ${pickupDate} at ${pickupTime}\nPassengers: ${passengers} | Luggage: ${luggage}`,
    );
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans select-none overflow-x-hidden">
      {/* Background glow & subtle luxury backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c8a05c]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2430_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo SYD Airport Transfer */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/40 shadow-inner group-hover:border-[#e7c27d] transition-all">
              <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider drop-shadow-md">
                SYD
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
                SYD Airport
              </span>
              <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
                Transfer
              </span>
              <span className="text-[8px] tracking-[0.36em] text-zinc-300 uppercase font-light mt-1.5 leading-none">
                Chauffeur Services
              </span>
            </div>
          </Link>

          {/* Contact / Back to Home */}
          <div className="flex items-center gap-5">
            <a
              href="tel:1300615165"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors font-medium"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>1300 615 165</span>
            </a>
            <Link
              href="/"
              className="text-xs font-semibold px-4 py-2 rounded border border-white/20 hover:border-white text-zinc-200 hover:text-white transition-all bg-white/5 hover:bg-white/10"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center">
        {/* Step indicator breadcrumb */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#c8a05c] mb-3">
          <span className="w-6 h-6 rounded-full bg-[#c8a05c] text-black flex items-center justify-center font-bold text-xs">
            {step}
          </span>
          <span>
            {step === 1
              ? "Step 1 of 3: Select Vehicle Category"
              : "Step 2 of 3: Pickup & Drop-Off Locations"}
          </span>
        </div>

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-white font-serif">
              How would you like to travel?
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 text-center max-w-lg">
              Choose between our on-demand fast Taxi service or our prestigious
              private Chauffeur experience.
            </p>

            {/* Category Selection Cards */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
              {/* Card 1: Chauffeur Service */}
              <button
                type="button"
                onClick={() => handleContinueCategory("chauffeur")}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer text-left flex flex-col bg-zinc-900/60 backdrop-blur-md ${
                  selectedCategory === "chauffeur"
                    ? "border-[#c8a05c] shadow-[0_0_35px_rgba(200,160,92,0.25)] ring-2 ring-[#c8a05c]/50 scale-[1.01]"
                    : "border-white/10 hover:border-white/30 hover:bg-zinc-900/80"
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#c8a05c] text-black shadow-md">
                    Premium Executive
                  </span>
                </div>

                {/* Chauffeur Image Container */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <Image
                    src="/chauffeur-card.jpg"
                    alt="Chauffeur Luxury Car"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedCategory === "chauffeur"
                            ? "border-[#c8a05c] bg-[#c8a05c]"
                            : "border-zinc-500"
                        }`}
                      >
                        {selectedCategory === "chauffeur" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-[#e8c683] transition-colors">
                        Chauffeur Service
                      </h2>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      First-class European sedans, SUVs, and luxury vans with
                      uniformed, dedicated chauffeurs. Complimentary flight
                      tracking &amp; meet &amp; greet inside the terminal.
                    </p>

                    {/* Features list */}
                    <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#c8a05c] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>
                          Mercedes-Benz, BMW, Audi &amp; Genesis fleet
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#c8a05c] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>60 mins complimentary airport wait time</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#c8a05c] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Fixed all-inclusive pricing with zero surge</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Ideal for:</span>
                    <span className="font-semibold text-zinc-200">
                      Executive, VIP &amp; Special Events
                    </span>
                  </div>
                </div>
              </button>

              {/* Card 2: Taxi Service */}
              <button
                type="button"
                onClick={() => handleContinueCategory("taxi")}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer text-left flex flex-col bg-zinc-900/60 backdrop-blur-md ${
                  selectedCategory === "taxi"
                    ? "border-[#c8a05c] shadow-[0_0_35px_rgba(200,160,92,0.25)] ring-2 ring-[#c8a05c]/50 scale-[1.01]"
                    : "border-white/10 hover:border-white/30 hover:bg-zinc-900/80"
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-black shadow-md">
                    Fast &amp; Direct
                  </span>
                </div>

                {/* Taxi Illustration/Graphic Container */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-9 h-9 text-amber-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11.3 2 12v4c0 .6.4 1 1 1h2" />
                        <circle cx="7" cy="17" r="2" />
                        <path d="M9 17h6" />
                        <circle cx="17" cy="17" r="2" />
                        <path d="M9 5h6v2H9z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest">
                      Standard &amp; Maxi Taxi
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedCategory === "taxi"
                            ? "border-[#c8a05c] bg-[#c8a05c]"
                            : "border-zinc-500"
                        }`}
                      >
                        {selectedCategory === "taxi" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                        Taxi Service
                      </h2>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Convenient airport pickup and drop-off with reliable
                      licensed taxis. Available for immediate dispatch or
                      pre-scheduled rides across greater Sydney.
                    </p>

                    {/* Features list */}
                    <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-amber-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Sedans, Station Wagons &amp; Maxi Cabs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-amber-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Standard metered rate or upfront estimate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-amber-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Direct terminal curb pick-up &amp; drop-off</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Ideal for:</span>
                    <span className="font-semibold text-zinc-200">
                      Everyday Commutes &amp; Quick Trips
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Continue Button */}
            <div className="mt-10 sm:mt-12 flex flex-col items-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] hover:from-[#d6af70] hover:to-[#eed095] text-black shadow-xl hover:shadow-[0_0_25px_rgba(200,160,92,0.4)] transition-all transform active:scale-95 cursor-pointer"
              >
                Continue with{" "}
                {selectedCategory === "chauffeur" ? "Chauffeur" : "Taxi"} →
              </button>
              <span className="text-xs text-zinc-400">
                Free cancellation up to 2 hours before pickup
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: PICKUP & DROP-OFF FORM */}
        {step === 2 && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            {/* Active Service Badge & Switcher */}
            <div className="flex items-center justify-between w-full mb-6 p-4 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8a05c] animate-pulse" />
                <span className="text-xs sm:text-sm text-zinc-400">
                  Selected Category:
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e8c683]">
                  {selectedCategory === "chauffeur"
                    ? "Executive Chauffeur"
                    : "Standard Taxi"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#c8a05c] hover:text-white underline underline-offset-4 cursor-pointer font-medium transition-colors"
              >
                Change Category
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-white font-serif">
              Where can we pick you up?
            </h1>
            <p className="mt-2 text-sm text-zinc-400 text-center max-w-md">
              Enter your pickup and destination details for accurate routing and
              guaranteed pricing.
            </p>

            {/* Quick airport selection buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-zinc-400 mr-1">Quick Airport:</span>
              <button
                type="button"
                onClick={() =>
                  setPickup("Sydney Airport International Terminal (T1)")
                }
                className="px-3 py-1 rounded-full text-xs font-medium border border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] transition-colors bg-white/5"
              >
                Sydney T1 (International)
              </button>
              <button
                type="button"
                onClick={() =>
                  setPickup("Sydney Airport Domestic Terminal (T2/T3)")
                }
                className="px-3 py-1 rounded-full text-xs font-medium border border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] transition-colors bg-white/5"
              >
                Sydney T2/T3 (Domestic)
              </button>
              <button
                type="button"
                onClick={() => setDropoff("Sydney CBD (City Center)")}
                className="px-3 py-1 rounded-full text-xs font-medium border border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] transition-colors bg-white/5"
              >
                Sydney CBD
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleBookingSubmit}
              className="mt-8 w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
            >
              {/* Pickup Address */}
              <div>
                <label
                  htmlFor="pickup-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Pickup Location <span className="text-[#c8a05c]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c8a05c]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="pickup-input"
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g. Sydney Airport (SYD), Hotel, or Street Address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white placeholder-zinc-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Drop-off Address */}
              <div>
                <label
                  htmlFor="dropoff-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Drop-off Location <span className="text-[#c8a05c]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <input
                    id="dropoff-input"
                    type="text"
                    required
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="e.g. The Langham Sydney, 89-113 Kent St, Millers Point"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white placeholder-zinc-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Pickup Date
                  </label>
                  <input
                    id="date-input"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Pickup Time
                  </label>
                  <input
                    id="time-input"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Passenger & Luggage Counts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="passengers-select"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Passengers
                  </label>
                  <select
                    id="passengers-select"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-zinc-900">
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="luggage-select"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Luggage Pieces
                  </label>
                  <select
                    id="luggage-select"
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-zinc-900">
                        {num} {num === 1 ? "Bag" : "Bags"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="flight-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Flight # (Optional)
                  </label>
                  <input
                    id="flight-input"
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. QF1, VA805"
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white placeholder-zinc-500 text-sm outline-none transition-all uppercase"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 hover:border-white text-zinc-300 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors text-center"
                >
                  ← Back to Categories
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] hover:from-[#d6af70] hover:to-[#eed095] text-black shadow-xl hover:shadow-[0_0_25px_rgba(200,160,92,0.4)] transition-all transform active:scale-95 cursor-pointer"
                >
                  Review Quote &amp; Confirm →
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
