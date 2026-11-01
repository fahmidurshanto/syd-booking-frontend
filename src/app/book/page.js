"use client";

import Image from "next/image";
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

      // Crisp, subtle entrance animation
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
      <div className="book-step-indicator flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#c8a05c] mb-3">
        <span className="w-6 h-6 rounded-full bg-[#c8a05c] text-black flex items-center justify-center font-bold text-xs">
          1
        </span>
        <span>Step 1 of 3: Select Vehicle Category</span>
      </div>

      <h1 className="book-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-white font-serif">
        How would you like to travel?
      </h1>
      <p className="book-subtitle mt-3 text-sm sm:text-base text-zinc-400 text-center max-w-lg">
        Choose between our prestigious private Chauffeur experience or our
        on-demand fast Taxi service.
      </p>

      {/* Category Selection Cards */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
        {/* Card 1: Chauffeur Service */}
        <div
          className={`category-card group relative rounded-2xl overflow-hidden border transition-all duration-300 text-left flex flex-col bg-zinc-900/60 backdrop-blur-md ${
            selectedCategory === "chauffeur"
              ? "border-[#c8a05c] shadow-[0_0_35px_rgba(200,160,92,0.25)] ring-2 ring-[#c8a05c]/50 scale-[1.01]"
              : "border-white/10 hover:border-[#c8a05c]/40 hover:bg-zinc-900/80"
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
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>

          {/* Content Details */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between w-full">
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
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs w-full">
              <span className="text-zinc-400">Ideal for:</span>
              <span className="font-semibold text-zinc-200">
                Executive, VIP &amp; Special Events
              </span>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-end w-full">
              <button
                type="button"
                onClick={() => handleSelectCategory("chauffeur")}
                className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#c8a05c]/50 text-[#e8c683] bg-zinc-950/40 hover:bg-[#c8a05c] hover:text-black hover:border-[#c8a05c] hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] active:scale-95 transition-all duration-300"
              >
                Book Chauffeur
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Taxi Service */}
        <div
          className={`category-card group relative rounded-2xl overflow-hidden border transition-all duration-300 text-left flex flex-col bg-zinc-900/60 backdrop-blur-md ${
            selectedCategory === "taxi"
              ? "border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.25)] ring-2 ring-amber-400/50 scale-[1.01]"
              : "border-white/10 hover:border-amber-400/40 hover:bg-zinc-900/80"
          }`}
        >
          {/* Badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-black shadow-md">
              Fast &amp; Direct
            </span>
          </div>

          {/* Taxi Image Container */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <Image
              src="/taxi-card.jpg"
              alt="Sydney Taxi and Maxi Taxi Service"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>

          {/* Content Details */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedCategory === "taxi"
                      ? "border-amber-400 bg-amber-400"
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
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs w-full">
              <span className="text-zinc-400">Ideal for:</span>
              <span className="font-semibold text-zinc-200">
                Everyday Commutes &amp; Quick Trips
              </span>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-end w-full">
              <button
                type="button"
                onClick={() => handleSelectCategory("taxi")}
                className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-amber-400/50 text-amber-300 bg-zinc-950/40 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95 transition-all duration-300"
              >
                Book Taxi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-zinc-400 text-center">
        Free cancellation up to 2 hours before pickup
      </div>
    </div>
  );
}
