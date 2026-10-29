"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Smooth open / close mobile menu animation using GSAP
  const toggleMobileMenu = () => {
    if (isAnimatingRef.current) return;
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    if (!mobileMenuOpen) {
      // OPEN MENU
      isAnimatingRef.current = true;
      setMobileMenuOpen(true);
      menuEl.style.display = "block";

      const items = menuEl.querySelectorAll(".mobile-menu-item");
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      tl.fromTo(
        menuEl,
        { height: 0, opacity: 0, y: -10 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
      ).fromTo(
        items,
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.2",
      );
    } else {
      // CLOSE MENU
      closeMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) {
      setMobileMenuOpen(false);
      return;
    }

    isAnimatingRef.current = true;
    const items = menuEl.querySelectorAll(".mobile-menu-item");

    const tl = gsap.timeline({
      onComplete: () => {
        menuEl.style.display = "none";
        setMobileMenuOpen(false);
        isAnimatingRef.current = false;
      },
    });

    tl.to(items, {
      y: -10,
      opacity: 0,
      stagger: 0.04,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      menuEl,
      {
        height: 0,
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.1",
    );
  };

  useGSAP(
    () => {
      // Responsive animation management using GSAP matchMedia
      const mm = gsap.matchMedia();

      // Master timeline for entry animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Hero background zoom & fade
      tl.fromTo(
        ".hero-bg-img",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
      );

      // 2. Header and Top Bar entry
      tl.fromTo(
        ".top-bar-contact",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=1.2",
      ).fromTo(
        ".main-navbar",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.9",
      );

      // Desktop & Tablet screens (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        // Desktop hero typography & button reveal
        tl.fromTo(
          ".hero-headline",
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.5",
        )
          .fromTo(
            ".hero-subtitle",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.7",
          )
          .fromTo(
            ".hero-cta-btn",
            { scale: 0.85, opacity: 0, y: 20 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            "-=0.5",
          )
          .fromTo(
            ".stat-item",
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.14, duration: 0.8 },
            "-=0.4",
          )
          .fromTo(
            ".chat-widget",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
            "-=0.2",
          );
      });

      // Mobile screens (max-width: 767px) - Optimized and snappy for touch devices
      mm.add("(max-width: 767px)", () => {
        tl.fromTo(
          ".hero-headline",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5",
        )
          .fromTo(
            ".hero-subtitle",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5",
          )
          .fromTo(
            ".hero-cta-btn",
            { scale: 0.9, opacity: 0, y: 15 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "back.out(1.5)",
            },
            "-=0.4",
          )
          .fromTo(
            ".stat-item",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
            "-=0.3",
          )
          .fromTo(
            ".chat-widget",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            "-=0.2",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col font-sans select-none overflow-x-hidden text-white"
    >
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-bg-img relative w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="Luxury chauffeur service in Australia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Cinematic darken overlay to match the screenshot atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
      </div>

      {/* Header / Navigation Bar */}
      <header className="relative z-20 w-full">
        {/* Top bar (contact utility) */}
        <div className="top-bar-contact w-full border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-end text-xs text-zinc-300 font-medium tracking-wide">
            <a
              href="tel:+61404410000"
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
              <span>+61 404 410 000</span>
            </a>
          </div>
        </div>

        {/* Primary Navbar */}
        <div className="main-navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-200">
            <a href="#about-us" className="hover:text-white transition-colors">
              About Us
            </a>

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
              onClick={() => toggleMobileMenu()}
              className="p-2 text-zinc-200 hover:text-white transition-transform active:scale-90"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${
                    mobileMenuOpen
                      ? "rotate-45 translate-x-0.5 -translate-y-0.5"
                      : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${
                    mobileMenuOpen
                      ? "-rotate-45 translate-x-0.5 translate-y-0.5"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown with GSAP animation */}
        <div
          ref={mobileMenuRef}
          style={{ display: "none" }}
          className="lg:hidden bg-zinc-950/95 backdrop-blur-md border-b border-white/10 px-6 py-5 space-y-4 overflow-hidden"
        >
          <a
            href="#about-us"
            onClick={() => closeMobileMenu()}
            className="mobile-menu-item block text-base font-medium text-zinc-200 hover:text-white py-1 transition-colors"
          >
            About Us
          </a>
          <a
            href="#contact-us"
            onClick={() => closeMobileMenu()}
            className="mobile-menu-item block text-base font-medium text-zinc-200 hover:text-white py-1 transition-colors"
          >
            Contact Us
          </a>
          <div className="mobile-menu-item pt-2">
            <Link
              href="/book"
              onClick={() => closeMobileMenu()}
              className="block text-center w-full py-3 rounded-lg border border-[#c8a05c] bg-gradient-to-r from-[#c59e5f] to-[#e4bf7e] text-black font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#c8a05c]/10"
            >
              Book Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Body Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md">
            Australia&apos;s Chauffeur Service
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mt-4 sm:mt-5 text-base sm:text-lg text-zinc-200/90 font-normal leading-relaxed max-w-xl">
            Experience the SYD Airport Transfer difference with premium
            transfers, tours and event transport.
          </p>

          {/* Call-to-action Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center">
            {/* BOOK NOW gold button */}
            <Link
              href="/book"
              className="hero-cta-btn px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] shadow-lg transition-transform active:scale-95"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Bottom Statistics Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 items-end">
          {/* Stat 1 */}
          <div className="stat-item">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              2.95m
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Passengers moved last 12 months
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-item">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              14,000+
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              5 Star Google Reviews
            </div>
          </div>

          {/* Stat 3 */}
          <div className="stat-item">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              13
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Offices across Australia, NZ &amp; Singapore
            </div>
          </div>

          {/* Stat 4 */}
          <div className="stat-item">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              1500+
            </div>
            <div className="text-xs sm:text-sm text-zinc-300/90 mt-1.5 font-normal leading-snug">
              Size of fleet
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat widget button in bottom right corner */}
      <div className="chat-widget fixed bottom-6 right-6 z-30">
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
