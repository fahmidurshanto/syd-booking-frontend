"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans select-none overflow-x-hidden text-white">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Luxury chauffeur service in Australia"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Cinematic darken overlay to match the screenshot atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
      </div>

      {/* Header / Navigation Bar */}
      <header className="relative z-20 w-full">
        {/* Top bar (small secondary utility links) */}
        <div className="w-full border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-end text-xs text-zinc-300 font-medium tracking-wide gap-6">
            <a
              href="#join-the-fleet"
              className="hover:text-white transition-colors"
            >
              Join The Fleet
            </a>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
              <span>Accounts</span>
              <svg
                className="w-3 h-3 text-zinc-400 group-hover:text-white transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a
              href="tel:1300615165"
              className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors font-semibold"
            >
              <svg
                className="w-3.5 h-3.5 text-zinc-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>1300 615 165</span>
            </a>
          </div>
        </div>

        {/* Primary Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo SYD Airport Transfer */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/40 shadow-inner group-hover:border-[#e7c27d] transition-all">
              <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider drop-shadow-md">
                SYD
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-xl font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
                SYD Airport
              </span>
              <span className="text-lg sm:text-xl font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
                Transfer
              </span>
              <span className="text-[9px] tracking-[0.36em] text-zinc-300 uppercase font-light mt-1.5 leading-none">
                Chauffeur Services
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-200">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Airport Transfers</span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Locations</span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Services</span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>The Fleet</span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>About Us</span>
              <svg
                className="w-3.5 h-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <a
              href="#contact-us"
              className="hover:text-white transition-colors"
            >
              Contact Us
            </a>

            {/* Book Now outlined pill button */}
            <Link
              href="/book"
              className="ml-2 px-5 py-2 rounded border border-white/60 hover:border-white text-white text-xs tracking-wider font-semibold transition-all hover:bg-white/10"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950/95 backdrop-blur-md border-b border-white/10 px-6 py-4 space-y-3">
            <a
              href="#airport-transfers"
              className="block text-zinc-300 hover:text-white py-1"
            >
              Airport Transfers
            </a>
            <a
              href="#locations"
              className="block text-zinc-300 hover:text-white py-1"
            >
              Locations
            </a>
            <a
              href="#services"
              className="block text-zinc-300 hover:text-white py-1"
            >
              Services
            </a>
            <a
              href="#the-fleet"
              className="block text-zinc-300 hover:text-white py-1"
            >
              The Fleet
            </a>
            <a
              href="#about-us"
              className="block text-zinc-300 hover:text-white py-1"
            >
              About Us
            </a>
            <a
              href="#contact-us"
              className="block text-zinc-300 hover:text-white py-1"
            >
              Contact Us
            </a>
            <div className="pt-2">
              <Link
                href="/book"
                className="block text-center w-full py-2.5 rounded border border-[#c8a05c] bg-[#c8a05c] text-black font-semibold text-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Body Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
            Australia&apos;s Chauffeur Service
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-200/90 font-normal leading-relaxed max-w-xl">
            Experience the SYD Airport Transfer difference with premium
            transfers, tours and event transport.
          </p>

          {/* Call-to-action Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center">
            {/* BOOK NOW gold button */}
            <Link
              href="/book"
              className="px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] shadow-lg transition-transform active:scale-95"
            >
              Book Now
            </Link>

            {/* MANAGE BOOKING outline button */}
            <a
              href="#manage"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded border border-white/80 hover:border-white text-white hover:bg-white/10 transition-colors"
            >
              Manage Booking
            </a>

            {/* GET AN INSTANT QUOTE outline button */}
            <a
              href="#quote"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded border border-white/80 hover:border-white text-white hover:bg-white/10 transition-colors"
            >
              Get An Instant Quote
            </a>
          </div>
        </div>

        {/* Bottom Statistics and App Store Badges Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-end">
          {/* Stat 1 */}
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              2.95m
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Passengers moved last 12 months
            </div>
          </div>

          {/* Stat 2 */}
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              14,000+
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              5 Star Google Reviews
            </div>
          </div>

          {/* Stat 3 */}
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              13
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Offices across Australia, NZ &amp; Singapore
            </div>
          </div>

          {/* Stat 4 */}
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              1500+
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Size of fleet
            </div>
          </div>

          {/* App download buttons */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 flex flex-col items-start lg:items-end justify-center">
            <div className="flex flex-row items-center gap-2">
              {/* Google Play badge */}
              <a
                href="#google-play"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/30 text-white transition-all shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.6 1.7L13.8 12 3.6 22.3C3.2 21.8 3 21.2 3 20.4V3.6C3 2.8 3.2 2.2 3.6 1.7Z"
                    fill="#2196F3"
                  />
                  <path
                    d="M17.2 8.6L13.8 12L3.6 1.7C4.1 1.3 4.9 1.1 5.7 1.6L17.2 8.6Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M17.2 15.4L5.7 22.4C4.9 22.9 4.1 22.7 3.6 22.3L13.8 12L17.2 15.4Z"
                    fill="#F44336"
                  />
                  <path
                    d="M21.2 10.7L17.2 8.6L13.8 12L17.2 15.4L21.2 13.3C22.3 12.6 22.3 11.4 21.2 10.7Z"
                    fill="#FFEB3B"
                  />
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] uppercase tracking-wider text-zinc-300 font-medium">
                    Get it on
                  </span>
                  <span className="text-xs font-semibold text-white">
                    Google Play
                  </span>
                </div>
              </a>

              {/* Apple App Store badge */}
              <a
                href="#app-store"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/30 text-white transition-all shadow-md"
              >
                <svg
                  className="w-5 h-5 fill-current text-white"
                  viewBox="0 0 170 170"
                  aria-hidden="true"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.5-7.71-11.44-14.01-6.19-9.84-11.05-20.73-14.59-32.68-3.53-11.95-5.3-23.27-5.3-33.96 0-14.88 3.73-27.13 11.2-36.75 7.46-9.62 16.92-14.53 28.38-14.75 5.11 0 10.62 1.35 16.54 4.05 5.92 2.7 9.77 4.1 11.55 4.22 1.48-.12 5.51-1.63 12.09-4.53 6.58-2.9 12.35-4.15 17.3-3.75 13.57.8 24.32 5.75 32.25 14.85-11.75 7.15-17.5 16.89-17.26 29.21.24 9.63 4.1 17.65 11.57 24.05 7.48 6.4 16.32 10.15 26.54 11.25-2.22 6.78-4.87 13.55-7.96 20.32zM119.22 33.15c0-7.35 2.65-14.15 7.94-20.4 5.29-6.25 11.77-10.29 19.45-12.12.8 3.69.87 7.2.22 10.53-.65 3.33-2.12 6.94-4.41 10.83-2.6 4.38-5.83 7.89-9.7 10.53-3.87 2.64-7.83 4.29-11.88 4.95-.5-1.42-.9-2.85-1.2-4.32-.42-1.47-.62-2.87-.62-4.2z" />
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] uppercase tracking-wider text-zinc-300 font-medium">
                    Download on the
                  </span>
                  <span className="text-xs font-semibold text-white">
                    App Store
                  </span>
                </div>
              </a>
            </div>
            <span className="text-[11px] text-zinc-400 mt-2 font-medium">
              Download the SYD Airport Transfer app
            </span>
          </div>
        </div>
      </main>

      {/* Floating Chat widget button in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          aria-label="Open chat support"
          className="w-12 h-12 rounded-full bg-[#1e2a4a]/90 hover:bg-[#25355e] text-white flex items-center justify-center shadow-2xl border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
