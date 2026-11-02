"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="relative z-10 w-full bg-[#07080b] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden text-white font-sans">
      {/* Ambient background glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-[28rem] h-[28rem] bg-[#c8a05c]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[26rem] h-[26rem] bg-blue-950/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Col 1: Brand Info & Accreditation */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/60 shadow-inner group-hover:border-[#e7c27d] transition-all">
                <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider">
                  SYD
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
                  SYD Airport
                </span>
                <span className="text-base sm:text-lg font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
                  Transfer
                </span>
                <span className="text-[9px] tracking-[0.34em] text-zinc-400 uppercase font-light mt-1.5 leading-none">
                  Chauffeur Services
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal pt-1">
              Australia&apos;s luxury chauffeur and executive airport ground transport provider.
              Delivering exceptional punctuality, comfort, and professional discretion on every journey.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#c8a05c]/25 bg-[#c8a05c]/5 text-[11px] text-[#e8c683] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Point to Point Transport Accredited
              </div>
            </div>
          </div>

          {/* Col 2: Chauffeur Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8c683] mb-5">
              Chauffeur Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
              <li>
                <Link href="/book/chauffeur" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Sydney Airport Transfers (SYD)
                </Link>
              </li>
              <li>
                <Link href="/book/chauffeur" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Executive &amp; Corporate Travel
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  International Student Pickups
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Conferences &amp; Special Events
                </Link>
              </li>
              <li>
                <Link href="/book/chauffeur" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Hunter Valley &amp; Sightseeing Tours
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  All-Day &amp; Hourly Chauffeur Hire
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8c683] mb-5">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-zinc-400">
              <li>
                <Link href="/about-us" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  About Our Fleet &amp; Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Contact Dispatch &amp; Enquiries
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Online Booking &amp; Quote System
                </Link>
              </li>
              <li>
                <Link href="/about-us#locations" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Nationwide Australia Coverage
                </Link>
              </li>
              <li>
                <Link href="/about-us#at-your-service" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">
                  Luxury Vehicle Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: 24/7 Operations Desk & Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8c683] mb-5">
              24/7 Operations Desk
            </h4>
            <div className="space-y-3.5 text-xs sm:text-[13px] text-zinc-400">
              <p className="flex items-center gap-2">
                <span className="text-[#c8a05c] font-semibold w-16 shrink-0">AU Phone:</span>
                <a
                  href="tel:+61404410000"
                  className="text-white hover:text-[#d3ad6b] font-semibold transition-colors"
                >
                  +61 404 410 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c8a05c] font-semibold w-16 shrink-0">Global:</span>
                <a
                  href="tel:+61293179000"
                  className="text-white hover:text-[#d3ad6b] transition-colors"
                >
                  +61 2 9317 9000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c8a05c] font-semibold w-16 shrink-0">Email:</span>
                <a
                  href="mailto:info@sydairporttransfer.com.au"
                  className="text-white hover:text-[#d3ad6b] truncate transition-colors"
                >
                  info@sydairporttransfer.com.au
                </a>
              </p>

              <div className="pt-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-lg bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#c8a05c]/10"
                >
                  <span>Reserve Online Now</span>
                  <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {currentYear} SYD Airport Transfer Chauffeur Services. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-zinc-400">
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Terms of Transport
            </Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Passenger Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
