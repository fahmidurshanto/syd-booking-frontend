"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ChauffeursAtYourService from "@/components/ChauffeursAtYourService";
import ServicesCarousel from "@/components/ServicesCarousel";
import ProfessionalChauffeurs from "@/components/ProfessionalChauffeurs";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
const ADMIN_LOGIN_URL = `${ADMIN_URL.replace(/\/+$/, "")}/login`;

export default function Home() {
  const containerRef = useRef(null);

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
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col font-sans select-none overflow-x-hidden text-white bg-[#0b0c10]"
    >
      {/* Hero Container with Background Hero Image */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
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
        <Navbar currentPath="/" />

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
              className="hero-cta-btn px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Book Now
            </Link>

            {/* MANAGE BOOKING outlined button */}
            <Link
              href="/customer/bookings"
              className="hero-cta-btn px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded border border-white/70 hover:border-white text-white hover:bg-white/10 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 backdrop-blur-sm"
            >
              Manage Booking
            </Link>

            {/* GET AN INSTANT QUOTE outlined button */}
            <Link
              href="/book"
              className="hero-cta-btn px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded border border-white/70 hover:border-white text-white hover:bg-white/10 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 backdrop-blur-sm"
            >
              Get An Instant Quote
            </Link>
          </div>

          {/* Understated vehicle tracking link */}
          <div className="mt-4 sm:mt-5">
            <Link
              href="/customer/bookings"
              className="text-xs sm:text-sm text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-500 hover:decoration-white transition-colors tracking-wide font-normal inline-flex items-center gap-1.5"
            >
              <span>Track my Vehicle</span>
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
      </div>

      {/* "Chauffeurs At Your Service" Section below Hero */}
      <ChauffeursAtYourService />

      {/* "Moving You In Comfort And Style" Services Carousel */}
      <div id="services">
        <ServicesCarousel />
      </div>

      {/* "Your Private Chauffeur: Professional, Experienced, Courteous And Discreet" */}
      <ProfessionalChauffeurs />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
