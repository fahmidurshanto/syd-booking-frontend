"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("nsw");
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  // Locations data matching Hughes Australia nationwide coverage
  const locationsData = {
    nsw: {
      title: "New South Wales",
      airports: "Sydney Kingsford Smith (SYD), Bankstown, Newcastle, Byron Bay (Ballina)",
      desc: "Our primary flagship hub. Operating 24/7 across metropolitan Sydney, Western Sydney, Greater Hunter, and the Northern Rivers.",
      hubs: [
        { name: "Sydney Airport (Domestic & International)", time: "24/7 Meet & Greet" },
        { name: "Sydney CBD & North Sydney", time: "Direct Chauffeur Service" },
        { name: "Newcastle & Hunter Valley", time: "Wine Tours & Transfers" },
        { name: "Ballina / Byron Bay", time: "Coastal VIP Chauffeurs" },
      ],
    },
    vic: {
      title: "Victoria",
      airports: "Melbourne Airport (Tullamarine MEL), Avalon (AVV), Essendon",
      desc: "Comprehensive executive transport across Melbourne CBD, Southbank, Mornington Peninsula, and Yarra Valley.",
      hubs: [
        { name: "Melbourne Airport (MEL)", time: "Express Chauffeur Lanes" },
        { name: "Melbourne CBD & Southbank", time: "Corporate Roadshows" },
        { name: "Yarra Valley Wine Region", time: "Private Day Charters" },
        { name: "Avalon Airport (AVV)", time: "Regional Connections" },
      ],
    },
    qld: {
      title: "Queensland",
      airports: "Brisbane Airport (BNE), Gold Coast (OOL), Cairns (CNS), Sunshine Coast (MCY)",
      desc: "Connecting Queensland's prime business centres and coastal tourism paradises with high-end luxury vehicles.",
      hubs: [
        { name: "Brisbane Airport & CBD", time: "Executive Transfers" },
        { name: "Gold Coast (Coolangatta)", time: "VIP Hotel & Resort Service" },
        { name: "Sunshine Coast & Noosa", time: "Luxury Coastal Transit" },
        { name: "Cairns & Port Douglas", time: "Tropical North Chauffeurs" },
      ],
    },
    act: {
      title: "Australian Capital Territory",
      airports: "Canberra Airport (CBR)",
      desc: "Trusted by government officials, diplomatic delegations, and corporate executives visiting the nation's capital.",
      hubs: [
        { name: "Canberra Airport (CBR)", time: "Priority Terminal Pickups" },
        { name: "Parliament House & Civic", time: "Diplomatic Transport" },
        { name: "Barton & Russell Offices", time: "Government Protocol Chauffeurs" },
      ],
    },
    wa: {
      title: "Western Australia",
      airports: "Perth Airport (PER T1-T4)",
      desc: "Luxury chauffeured solutions for the resources sector, corporate executives, and VIP private itineraries across Western Australia.",
      hubs: [
        { name: "Perth Airport (All Terminals)", time: "Flight Tracked Arrivals" },
        { name: "Perth CBD & Elizabeth Quay", time: "Corporate Account Hire" },
        { name: "Fremantle & Swan Valley", time: "Day Tours & Leisure" },
      ],
    },
    sa: {
      title: "South Australia",
      airports: "Adelaide Airport (ADL)",
      desc: "Seamless connectivity between Adelaide Airport, the central business district, Barossa Valley, and McLaren Vale.",
      hubs: [
        { name: "Adelaide Airport (ADL)", time: "Meet & Greet Service" },
        { name: "Adelaide CBD & North Adelaide", time: "Executive Sedans" },
        { name: "Barossa Valley", time: "Private Winery Tours" },
      ],
    },
    tas: {
      title: "Tasmania",
      airports: "Hobart Airport (HBA), Launceston (LST)",
      desc: "Exclusive chauffeur services for bespoke Tasmanian leisure adventures, corporate retreats, and airport transfers.",
      hubs: [
        { name: "Hobart Airport (HBA)", time: "Direct CBD Connections" },
        { name: "Launceston Airport (LST)", time: "Regional Transfers" },
      ],
    },
  };

  // Why Choose Us cards inspired by Hughes 7 key highlights
  const whyChooseUsFeatures = [
    {
      title: "Australia's Premier Fleet",
      desc: "Modern Mercedes-Benz, BMW, and Audi executive sedans, SUVs, and luxury people movers.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8m-8 5h4m-9 9l2-7h14l2 7H3zM5 14h14" />
        </svg>
      ),
    },
    {
      title: "Nationwide Coverage",
      desc: "Seamless chauffeur network across Sydney, Melbourne, Brisbane, Canberra, Perth, and Adelaide.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Live GPS & Flight Tracking",
      desc: "We monitor inbound flights in real time. We automatically adjust for delays so your driver is always ready.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "24/7 Dedicated Support",
      desc: "Live Australian dispatch team on duty 24/7/365 to handle reservations, changes, and flight updates.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Decades of Excellence",
      desc: "Proven track record delivering reliable, executive airport and corporate ground transportation.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Conferences & Events",
      desc: "Specialized logistics and multi-vehicle coordinators for large VIP events, summits, and delegations.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Courteous & Discreet Chauffeurs",
      desc: "Uniformed, police-checked, fully licensed professionals committed to passenger safety and absolute privacy.",
      icon: (
        <svg className="w-6 h-6 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans overflow-x-hidden selection:bg-[#c8a05c]/30 selection:text-[#f3dfb9]">
      {/* Background ambient luxury glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-[#c8a05c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/4 w-[36rem] h-[36rem] bg-[#c8a05c]/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222736_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Unified Global Header & Navbar */}
      <Navbar currentPath="/about-us" />

      {/* HERO SECTION */}
      <section className="relative z-10 w-full pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-white/10 overflow-hidden">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/hero-bg.jpg"
            alt="SYD Airport Transfer Chauffeur"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/90 to-[#0b0c10]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-[#0b0c10]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation (Hughes style) */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#c8a05c]">&gt;</span>
            <span className="text-zinc-200 font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-xs font-semibold uppercase tracking-wider text-[#e8c683] mb-4">
              <span>★</span> Australia&apos;s Premier Chauffeur Service
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12]">
              About Us
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed">
              Australia&apos;s leading luxury ground transport &amp; private airport transfer service. Punctual, discreet, and reliable.
            </p>

            {/* Action Buttons (matching Hughes hero CTAs) */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                href="/book"
                className="px-8 py-3.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#141009] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Book Now
              </Link>
              <Link
                href="/contact-us"
                className="px-8 py-3.5 rounded border border-white/40 hover:border-white text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all bg-white/5 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS RIBBON */}
      <section className="relative z-10 w-full py-8 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#e8c683] tracking-tight">10000</div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1">Passengers moved nationwide</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#e8c683] tracking-tight">1000+</div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1">5-Star Google Reviews</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#e8c683] tracking-tight">5</div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1">Key Airport Hubs Served</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#e8c683] tracking-tight">250</div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1">Fleet Vehicles Network</div>
          </div>
        </div>
      </section>

      {/* BRAND HERITAGE & INTRODUCTION (Hughes style intro) */}
      <section className="relative z-10 w-full py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
            Excellence In Motion
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            SYD Airport Transfer – Australia&apos;s Leading Luxury Ground Transport Provider
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#c8a05c] to-transparent mx-auto mt-6 mb-8" />
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            We are dedicated to delivering an unmatched standard of private chauffeur and airport transfer services across Sydney and Australia. While modern travel continues to evolve, our foundational commitment remains unwavering: <span className="text-white font-medium">absolute punctuality, courteous discretion, and pristine luxury</span> on every journey.
          </p>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Whether welcoming international corporate executives at Sydney Kingsford Smith Airport, handling high-profile delegate roadshows, or providing comfortable family airport transfers with baby seats, SYD Airport Transfer delivers peace of mind every time you step into our vehicles.
          </p>
        </div>

        {/* 7 KEY PILLARS / WHY CHOOSE US CARDS (Inspired by Hughes 7 badges) */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-200">
              Why Discerning Travelers Choose SYD Airport Transfer
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              Built on uncompromising standards of passenger safety, convenience, and luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {whyChooseUsFeatures.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#c8a05c]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#c8a05c]/60 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-semibold text-white group-hover:text-[#e8c683] transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-[#c8a05c] font-medium tracking-wide">
                  <span>PREMIUM SERVICE</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "AT YOUR SERVICE" SPLIT SECTION (Mirroring Hughes Australia split layout) */}
      <section id="at-your-service" className="relative z-10 w-full py-20 bg-zinc-950/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Title Column */}
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
                Bespoke Hospitality
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                At your service
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                From our 24/7 client dispatch managers to our impeccably dressed chauffeurs, every team member is an ambassador for high-touch personal transport.
              </p>
              <div className="mt-8 p-6 rounded-xl border border-[#c8a05c]/30 bg-[#c8a05c]/5">
                <div className="text-sm font-semibold text-[#e8c683]">The SYD Airport Transfer Promise</div>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Fixed upfront pricing with all airport parking and road tolls included. No surge pricing during peak hours or weather events.
                </p>
                <div className="mt-4">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#c8a05c] hover:text-[#e8c683] uppercase tracking-wider"
                  >
                    <span>Reserve a Chauffeur Now</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Checklist & Explanation Column */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base text-zinc-200 leading-relaxed font-normal">
                Whether you require seamless terminal meeting at Sydney Airport, corporate conference transfers across the CBD, or an all-day private chauffeured tour, we keep you moving nationwide in comfort and unruffled style.
              </p>
              <p className="text-sm text-zinc-300 font-medium">
                No matter which service or vehicle tier you book, here is what you can always rely on:
              </p>

              {/* High-value Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  "Guaranteed on-time arrival with flight status monitoring",
                  "Uniformed, professional, and discreet private chauffeurs",
                  "Meticulously sanitized, late-model European executive fleet",
                  "Complimentary inside-terminal Meet & Greet with digital nameboard",
                  "60-minute complimentary waiting time on international arrivals",
                  "Complimentary chilled bottled spring water and device charging",
                  "No taxi queues, no waiting, and zero rideshare surge pricing",
                  "Dedicated 24/7 customer service and instant booking confirmations",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#c8a05c]/20 border border-[#c8a05c]/60 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#e8c683]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-xs sm:text-sm text-zinc-400 italic">
                We make reservations seamless with flexible corporate billing accounts, instant credit card processing via Stripe, and automated digital receipts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SHOWCASE TEASER (Matching Hughes fleet offerings) */}
      <section id="fleet" className="relative z-10 w-full py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
            Curated Prestige
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white">
            Our Luxury Chauffeur Fleet
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Hand-selected luxury vehicles tailored for solo executive travellers, VIP groups, and international delegates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Executive Sedan */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#c8a05c]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#c8a05c]">Category 01</div>
              <h3 className="text-xl font-bold font-serif text-white mt-1">Executive Sedans</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Mercedes-Benz E-Class, BMW 5 Series, Audi A6. Perfect for business transfers, airport arrivals, and day hire.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-300 border-t border-b border-white/5 py-3">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Up to 3 Passengers
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  2 Suitcases
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/book/chauffeur"
                className="block text-center w-full py-2.5 rounded border border-[#c8a05c]/60 text-xs font-semibold uppercase tracking-wider text-[#e8c683] hover:bg-[#c8a05c] hover:text-black transition-all"
              >
                Book Executive Sedan
              </Link>
            </div>
          </div>

          {/* Card 2: Executive SUV */}
          <div className="rounded-xl border border-[#c8a05c]/40 bg-white/[0.04] p-6 hover:border-[#c8a05c] transition-all flex flex-col justify-between relative shadow-lg shadow-[#c8a05c]/5">
            <div className="absolute -top-3 right-6 bg-[#c8a05c] text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#c8a05c]">Category 02</div>
              <h3 className="text-xl font-bold font-serif text-white mt-1">Premium SUVs</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Audi Q7, BMW X5, Lexus RX. Elevated luxury, enhanced ride clearance, and expansive luggage capacity.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-300 border-t border-b border-white/5 py-3">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Up to 4 Passengers
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  4 Suitcases
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/book/chauffeur"
                className="block text-center w-full py-2.5 rounded bg-[#c59e5f] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#d6af70] transition-all"
              >
                Book Luxury SUV
              </Link>
            </div>
          </div>

          {/* Card 3: VIP People Mover */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#c8a05c]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#c8a05c]">Category 03</div>
              <h3 className="text-xl font-bold font-serif text-white mt-1">VIP People Movers</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Mercedes-Benz V-Class &amp; Sprinters. Ample legroom, conference seating layout, and substantial luggage holds.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-300 border-t border-b border-white/5 py-3">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  7 - 14 Passengers
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  7+ Suitcases
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/book/chauffeur"
                className="block text-center w-full py-2.5 rounded border border-[#c8a05c]/60 text-xs font-semibold uppercase tracking-wider text-[#e8c683] hover:bg-[#c8a05c] hover:text-black transition-all"
              >
                Book People Mover
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE NATIONWIDE LOCATIONS TABS (Hughes tabbed section) */}
      <section id="locations" className="relative z-10 w-full py-20 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
              Nationwide Network
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white">
              Australia-Wide Service Locations
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              With offices and trusted chauffeur partners across every major capital city and regional airport, we keep you moving across Australia.
            </p>
          </div>

          {/* Location Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4 mb-8">
            {Object.keys(locationsData).map((key) => {
              const loc = locationsData[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#c8a05c] text-black shadow-lg shadow-[#c8a05c]/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {loc.title}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          {locationsData[activeTab] && (
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#c8a05c]">
                    Region Spotlight
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                    {locationsData[activeTab].title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    {locationsData[activeTab].desc}
                  </p>
                  <div className="mt-5 p-4 rounded-xl border border-white/5 bg-black/30">
                    <div className="text-xs text-zinc-400 uppercase font-semibold">
                      Airports Served
                    </div>
                    <div className="text-sm text-white font-medium mt-1">
                      {locationsData[activeTab].airports}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Key Transfer Routes &amp; Hubs
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {locationsData[activeTab].hubs.map((hub, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a05c]" />
                          <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                            {hub.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#c8a05c] font-semibold bg-[#c8a05c]/10 px-2 py-0.5 rounded">
                          {hub.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link
                      href="/book"
                      className="px-6 py-2.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-black text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Book In {locationsData[activeTab].title}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-black border-t border-white/10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/40">
                  <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider">SYD</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
                    SYD Airport
                  </span>
                  <span className="text-base font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
                    Transfer
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                Australia&apos;s luxury chauffeur and premium airport transfer service. Serving corporate executives, international tourists, and private VIP clients nationwide.
              </p>
              <div className="mt-4 text-[11px] text-[#c8a05c] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a05c]" />
                Point to Point Transport Accredited
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c683] mb-4">
                Chauffeur Services
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><Link href="/book" className="hover:text-white transition-colors">Airport Transfers</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Corporate &amp; Executive Transport</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">All-Day &amp; Hourly Chauffeurs</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Conferences &amp; Special Events</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Private Sightseeing Tours</Link></li>
              </ul>
            </div>

            {/* Col 3: Key Hubs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c683] mb-4">
                Key Locations
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li><a href="#locations" className="hover:text-white transition-colors">Sydney Airport (SYD)</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Melbourne Airport (MEL)</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Brisbane Airport (BNE)</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Gold Coast Airport (OOL)</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Canberra Airport (CBR)</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Perth &amp; Adelaide</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Support */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c683] mb-4">
                24/7 Operations Desk
              </h4>
              <div className="space-y-3 text-xs text-zinc-400">
                <p className="flex items-center gap-2">
                  <span className="text-[#c8a05c]">AU Phone:</span>
                  <a href="tel:+61404410000" className="text-white hover:text-[#d3ad6b] font-semibold">
                    +61 404 410 000
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#c8a05c]">Global:</span>
                  <a href="tel:+61293179000" className="text-white hover:text-[#d3ad6b]">
                    +61 2 9317 9000
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#c8a05c]">Email:</span>
                  <a href="mailto:info@sydairporttransfer.com.au" className="text-white hover:text-[#d3ad6b]">
                    info@sydairporttransfer.com.au
                  </a>
                </p>
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="inline-block px-4 py-2 rounded bg-[#c59e5f] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d6af70] transition-colors"
                  >
                    Online Booking System →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© {currentYear} SYD Airport Transfer Chauffeur Services. All Rights Reserved.</p>
            <div className="flex items-center space-x-6 text-zinc-400">
              <Link href="/contact-us" className="hover:text-white">Privacy Policy</Link>
              <Link href="/contact-us" className="hover:text-white">Terms of Transport</Link>
              <Link href="/contact-us" className="hover:text-white">Passenger Safety</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
