"use client";

import Link from "next/link";

export default function ServiceHeader({ isChauffeur, pickup, onQuickSelect }) {
  return (
    <>
      {/* Step indicator breadcrumb */}
      <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#c8a05c] mb-3">
        <span className="w-6 h-6 rounded-full bg-[#c8a05c] text-black flex items-center justify-center font-bold text-xs">
          2
        </span>
        <span>Step 2 of 3: Pickup &amp; Drop-Off Locations</span>
      </div>

      {/* Active Service Badge & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-6 p-4 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-md gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              isChauffeur ? "bg-[#c8a05c]" : "bg-amber-400"
            }`}
          />
          <span className="text-xs sm:text-sm text-zinc-400">
            Selected Service:
          </span>
          <span
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
              isChauffeur ? "text-[#e8c683]" : "text-amber-300"
            }`}
          >
            {isChauffeur ? "Executive Chauffeur" : "Standard & Maxi Taxi"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          {isChauffeur ? (
            <Link
              href="/book/taxi"
              className="text-amber-400 hover:text-white transition-colors"
            >
              Switch to Taxi →
            </Link>
          ) : (
            <Link
              href="/book/chauffeur"
              className="text-[#c8a05c] hover:text-white transition-colors"
            >
              Switch to Chauffeur →
            </Link>
          )}
          <span className="text-zinc-600">|</span>
          <Link
            href="/book"
            className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Change Category
          </Link>
        </div>
      </div>

      {/* Category Feature Highlights */}
      <div
        className={`w-full mb-6 p-3.5 rounded-xl border text-xs flex flex-wrap items-center justify-around gap-2 ${
          isChauffeur
            ? "bg-[#c8a05c]/10 border-[#c8a05c]/30 text-[#e8c683]"
            : "bg-amber-400/10 border-amber-400/30 text-amber-300"
        }`}
      >
        {isChauffeur ? (
          <>
            <span className="flex items-center gap-1.5">
              <span>✦</span> European Luxury Fleet
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> 60 Mins Complimentary Wait Time
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Inside Terminal Meet &amp; Greet
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Direct Terminal Pick-up
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Sedans &amp; Maxi Cabs
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Metered or Upfront Fixed Rate
            </span>
          </>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-white font-serif">
        Where can we pick you up?
      </h1>
      <p className="mt-2 text-sm text-zinc-400 text-center max-w-md">
        Select your pickup location first to explore connected destinations and
        guaranteed fares.
      </p>

      {/* Quick Airport selection buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-zinc-400 mr-1">Quick Pickup:</span>
        <button
          type="button"
          onClick={() => onQuickSelect({ name: "Sydney Airport (SYD)" })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            pickup === "Sydney Airport (SYD)"
              ? "border-[#c8a05c] bg-[#c8a05c]/20 text-[#e8c683] ring-1 ring-[#c8a05c]"
              : "border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] bg-white/5"
          }`}
        >
          ✈️ Sydney Airport (SYD)
        </button>
        <button
          type="button"
          onClick={() => onQuickSelect({ name: "Sydney CBD" })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            pickup === "Sydney CBD"
              ? "border-[#c8a05c] bg-[#c8a05c]/20 text-[#e8c683] ring-1 ring-[#c8a05c]"
              : "border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] bg-white/5"
          }`}
        >
          🏙️ Sydney CBD
        </button>
      </div>
    </>
  );
}
