"use client";

import React from "react";
import Link from "next/link";

export default function ProfessionalChauffeurs() {
  return (
    <section
      aria-labelledby="professional-chauffeurs-heading"
      className="relative z-10 w-full py-20 sm:py-28 bg-[#0b0c10] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow accents matching luxury theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[38rem] h-[22rem] bg-[#c8a05c]/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-10 right-1/4 w-[30rem] h-[18rem] bg-blue-950/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2433_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading, Subtitle badge & Book Now CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#e8c683] mb-5">
              <span>★</span> Point-to-Point Accredited Drivers
            </div>

            {/* Headline */}
            <h2
              id="professional-chauffeurs-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-white tracking-tight leading-[1.15]"
            >
              Your Private Chauffeur:{" "}
              <span className="block text-[#e8c683] mt-2">
                Professional, Experienced, Courteous And Discreet
              </span>
            </h2>

            {/* Subtle Divider */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#c8a05c] to-transparent mt-6 mb-8" />

            {/* BOOK NOW Button matching hero CTA styling */}
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl shadow-[#c8a05c]/15 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <span>Book Now</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right Column: Narrative Copy & Trust Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              We handpick our chauffeurs for their exemplary driving records, local Australian route
              expertise, and unwavering commitment to customer safety and privacy.
            </p>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Your SYD Airport Transfer chauffeur will tailor your experience precisely to your
              needs—whether that&apos;s seamless airport terminal luggage assistance, sharing local Sydney
              insights, or offering you complete quiet and discretion to rest or work in pristine comfort
              and style.
            </p>

            {/* 3 Quick Highlight Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10">
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-[#e8c683] font-bold text-sm">100%</div>
                <div className="text-xs text-zinc-400 mt-0.5">Police &amp; BG Checked</div>
              </div>
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-[#e8c683] font-bold text-sm">24/7</div>
                <div className="text-xs text-zinc-400 mt-0.5">Flight Monitored</div>
              </div>
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-[#e8c683] font-bold text-sm">Fixed</div>
                <div className="text-xs text-zinc-400 mt-0.5">Zero Surge Rates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
