"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BookPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("chauffeur");
  const pageContainerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".book-step-indicator",
        { y: -6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25 },
      )
        .fromTo(
          ".book-title",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
          "-=0.15",
        )
        .fromTo(
          ".book-subtitle",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25 },
          "-=0.2",
        )
        .fromTo(
          ".category-card",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.3,
          },
          "-=0.15",
        );
    },
    { scope: pageContainerRef },
  );

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    router.push(`/book/${category}`);
  };

  return (
    <div ref={pageContainerRef} className="w-full flex flex-col items-center">
      {/* Step indicator breadcrumb */}
      <div className="book-step-indicator flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-slate-500 mb-2">
        <span className="w-5 h-5 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-[11px]">
          1
        </span>
        <span>Step 1 of 3: Select Vehicle Category</span>
      </div>

      <h1 className="book-title text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center text-slate-900 font-serif">
        How would you like to travel?
      </h1>
      <p className="book-subtitle mt-2 text-xs sm:text-sm text-slate-500 text-center max-w-lg">
        Choose between our prestigious private Chauffeur experience or our
        on-demand fast Taxi service.
      </p>

      {/* Category Selection Cards (Light Mode Luxury) */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl">
        {/* Card 1: Chauffeur Service */}
        <div
          onClick={() => handleSelectCategory("chauffeur")}
          className={`category-card group relative rounded-2xl p-5 border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer bg-white shadow-sm hover:shadow-md ${
            selectedCategory === "chauffeur"
              ? "border-[#c8a05c] ring-2 ring-[#c8a05c]/30 shadow-md bg-amber-50/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {/* Header Row: Radio, Title & Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedCategory === "chauffeur"
                    ? "border-[#c8a05c] bg-[#c8a05c]"
                    : "border-slate-300 group-hover:border-[#c8a05c]"
                }`}
              >
                {selectedCategory === "chauffeur" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-[#b8860b] transition-colors">
                Chauffeur Service
              </h2>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
              Premium Executive
            </span>
          </div>

          {/* Footer Info & Action */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 w-full">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ideal for:</span>
              <span className="font-medium text-slate-700 text-xs">
                Executive, VIP &amp; Events
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectCategory("chauffeur");
              }}
              className="cursor-pointer shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#c8a05c] text-[#0f172a] bg-amber-50 hover:bg-[#c8a05c] hover:text-white active:scale-95 transition-all duration-200"
            >
              Book Chauffeur →
            </button>
          </div>
        </div>

        {/* Card 2: Taxi Service */}
        <div
          onClick={() => handleSelectCategory("taxi")}
          className={`category-card group relative rounded-2xl p-5 border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer bg-white shadow-sm hover:shadow-md ${
            selectedCategory === "taxi"
              ? "border-amber-400 ring-2 ring-amber-400/30 shadow-md bg-amber-50/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {/* Header Row: Radio, Title & Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedCategory === "taxi"
                    ? "border-amber-500 bg-amber-500"
                    : "border-slate-300 group-hover:border-amber-500"
                }`}
              >
                {selectedCategory === "taxi" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                Taxi Service
              </h2>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
              Fast &amp; Direct
            </span>
          </div>

          {/* Footer Info & Action */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 w-full">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ideal for:</span>
              <span className="font-medium text-slate-700 text-xs">
                Commutes &amp; Quick Trips
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectCategory("taxi");
              }}
              className="cursor-pointer shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-800 bg-slate-50 hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition-all duration-200"
            >
              Book Taxi →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500 text-center flex items-center gap-2">
        <span className="text-emerald-600 font-bold">✓</span>
        <span>Free cancellation up to 2 hours before pickup</span>
      </div>
    </div>
  );
}
