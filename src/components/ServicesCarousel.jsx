"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesCarousel() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: "student-transfers",
      title: "International Student",
      subtitle: "Transfers",
      desc: "Safe, welcoming, and dependable direct transfers for students arriving in Sydney.",
      image: "/services/student-transfers.jpg",
      href: "/book",
      icon: (
        // Mortarboard / Student Cap
        <svg
          className="w-6 h-6 text-[#e8c683]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13.18v4c0 2.5 3.13 4 7 4s7-1.5 7-4v-4"
          />
        </svg>
      ),
    },
    {
      id: "airport-transfers",
      title: "Airport",
      subtitle: "Transfers",
      desc: "Sydney International & Domestic Terminal meet & greet with real-time flight tracking.",
      image: "/services/airport-transfers.jpg",
      href: "/book/chauffeur",
      icon: (
        // Airplane
        <svg
          className="w-6 h-6 text-[#e8c683]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
          />
        </svg>
      ),
    },
    {
      id: "corporate-transfers",
      title: "Corporate",
      subtitle: "Transfers",
      desc: "Impeccable executive travel, Sydney CBD roadshows, and flexible corporate billing accounts.",
      image: "/services/corporate-transfers.jpg",
      href: "/book/chauffeur",
      icon: (
        // Executive / Tie / Briefcase Icon
        <svg
          className="w-6 h-6 text-[#e8c683]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14v4m-1-1l2 2"
          />
        </svg>
      ),
    },
    {
      id: "events-conferences",
      title: "Conferences &",
      subtitle: "Special Events",
      icon: (
        // Calendar / Convention Badge
        <svg
          className="w-6 h-6 text-[#e8c683]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 2v3M16 2v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 9h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"
          />
        </svg>
      ),
      desc: "Multi-vehicle logistics, VIP delegate coordination, gala dinners, and private wedding convoys.",
      image: "/services/events-conferences.jpg",
      href: "/contact-us",
    },
    {
      id: "luxury-tours",
      title: "Luxury",
      subtitle: "Tours",
      icon: (
        // Suitcase / Sightseeing Tour Luggage
        <svg
          className="w-6 h-6 text-[#e8c683]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <rect x="3" y="6" width="18" height="15" rx="2" strokeWidth="1.6" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 11h18M9 11v10M15 11v10"
          />
        </svg>
      ),
      desc: "Bespoke day charters to Hunter Valley wineries, Blue Mountains panoramic lookouts, and Sydney coastlines.",
      image: "/services/luxury-tours.jpg",
      href: "/book/chauffeur",
    },
  ];

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const gap = 20;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), services.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 300;
    const scrollDelta = (cardWidth + 24) * direction;
    el.scrollBy({ left: scrollDelta, behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 300;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="moving-in-comfort-heading"
      className="relative z-10 w-full py-20 sm:py-28 bg-[#0b0c10] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[34rem] h-[34rem] bg-[#c8a05c]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -left-20 w-[30rem] h-[30rem] bg-blue-950/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2433_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#e8c683] mb-4">
            <span>★</span> Tailored Ground Transportation
          </div>

          {/* Main Title */}
          <h2
            id="moving-in-comfort-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight"
          >
            Moving You In Comfort And Style
            <span className="block mt-1 text-[#e8c683]">Wherever You Need To Go</span>
          </h2>

          {/* Subtle Divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8a05c] to-transparent mx-auto mt-4 mb-6" />

          {/* Body Description */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Whether you are stepping off a long-haul flight at Sydney Airport, rushing between
            high-stakes CBD business meetings, travelling with family, or planning an exclusive private
            tour, SYD Airport Transfer has you covered. Our fleet of prestige sedans, SUVs, and luxury
            people movers—paired with discreet, professional chauffeurs—ensures every journey is
            comfortable, punctual, and memorable.
          </p>
        </div>

        {/* Carousel Container with Side-by-Side Outside Controls */}
        <div className="mt-14 sm:mt-16 flex items-center gap-3 sm:gap-4 lg:gap-6">
          {/* Left Arrow Button (Outside on left) */}
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`hidden md:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full items-center justify-center bg-[#151922] border border-white/15 text-white shadow-xl transition-all duration-300 ${
              canScrollLeft
                ? "hover:border-[#c8a05c] hover:bg-[#c8a05c] hover:text-black hover:scale-105 active:scale-95 cursor-pointer shadow-[#c8a05c]/10"
                : "opacity-25 cursor-not-allowed border-white/5 text-zinc-500"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Track in center */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-2 px-1 snap-x snap-mandatory focus:outline-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((item, idx) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative flex-shrink-0 w-[260px] sm:w-[280px] md:w-[290px] h-[390px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 snap-start shadow-xl transition-all duration-500 hover:border-[#c8a05c]/70 hover:shadow-2xl hover:shadow-[#c8a05c]/10 hover:-translate-y-1.5 focus:outline-none"
              >
                {/* Background Image with Zoom on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.title} ${item.subtitle}`}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 300px"
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle dark gradient overlay: lighter on top, deep black-gold gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                  <div className="absolute inset-0 bg-[#0b0c10]/30 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 h-full w-full p-6 flex flex-col justify-end">
                  {/* Floating Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center mb-3 group-hover:border-[#c8a05c] group-hover:bg-black/80 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight group-hover:text-[#e8c683] transition-colors">
                    {item.title}
                    <span className="block">{item.subtitle}</span>
                  </h3>

                  {/* Short description on card */}
                  <p className="mt-2 text-xs text-zinc-300/90 leading-relaxed line-clamp-2 group-hover:text-zinc-200 transition-colors">
                    {item.desc}
                  </p>

                  {/* Explore / Book CTA link */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-xs font-semibold tracking-wider uppercase text-[#e8c683]">
                    <span>Book Service</span>
                    <svg
                      className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button (Outside on right) */}
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`hidden md:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full items-center justify-center bg-[#151922] border border-white/15 text-white shadow-xl transition-all duration-300 ${
              canScrollRight
                ? "hover:border-[#c8a05c] hover:bg-[#c8a05c] hover:text-black hover:scale-105 active:scale-95 cursor-pointer shadow-[#c8a05c]/10"
                : "opacity-25 cursor-not-allowed border-white/5 text-zinc-500"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-[#c8a05c]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
