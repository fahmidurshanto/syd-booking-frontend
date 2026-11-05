"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ContactUsPage() {
  const [currentYear, setCurrentYear] = useState("2026");
  const [activeFaq, setActiveFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Email, Message).");
      setFormStatus("error");
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || "General Enquiry",
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit enquiry. Please try again.");
      }

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setErrorMessage(err.message || "Network error. Please try again or call our dispatch desk directly.");
      setFormStatus("error");
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Contact departments matching Hughes Australia structure
  const departments = [
    {
      id: "general",
      title: "General & Reservations Desk",
      desc: "Instant bookings, flight monitoring, passenger updates, and general enquiries.",
      badge: "24/7/365 Live Support",
      icon: (
        <svg className="w-5 h-5 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      items: [
        { label: "Within Australia", val: "+61 404 410 000", href: "tel:+61404410000" },
        { label: "International Enquiries", val: "+61 2 9317 9000", href: "tel:+61293179000" },
        { label: "Reservations Email", val: "info@sydairporttransfer.com.au", href: "mailto:info@sydairporttransfer.com.au" },
      ],
    },
    {
      id: "feedback",
      title: "Feedback & Customer Care",
      desc: "If our service did not meet your expectations or you wish to compliment a chauffeur, we want to hear from you.",
      badge: "Guaranteed 48hr Review",
      icon: (
        <svg className="w-5 h-5 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      items: [
        { label: "Dedicated Email", val: "feedback@sydairporttransfer.com.au", href: "mailto:feedback@sydairporttransfer.com.au" },
        { label: "Response Window", val: "Within 24 - 48 Hours", href: null },
        { label: "Executive Escalation", val: "Operations Director Monitored", href: null },
      ],
    },
    {
      id: "accounts",
      title: "Corporate Accounts & Billing",
      desc: "Monthly consolidated corporate invoicing, GST receipts, travel management portal access, and rate agreements.",
      badge: "Priority Business Desk",
      icon: (
        <svg className="w-5 h-5 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
        </svg>
      ),
      items: [
        { label: "Accounts Department", val: "accounts@sydairporttransfer.com.au", href: "mailto:accounts@sydairporttransfer.com.au" },
        { label: "Corporate Applications", val: "Flexible 30-Day Terms Available", href: null },
        { label: "Instant Receipts", val: "Automated Digital PDF Invoicing", href: null },
      ],
    },
    {
      id: "events",
      title: "Events, Conferences & Groups",
      desc: "Multi-vehicle logistics, VIP summits, airport meet & greet coordinators, and private touring charters.",
      badge: "Dedicated Project Manager",
      icon: (
        <svg className="w-5 h-5 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: [
        { label: "Events Coordinator", val: "events@sydairporttransfer.com.au", href: "mailto:events@sydairporttransfer.com.au" },
        { label: "Fleet Capacity", val: "Executive Sedans, SUVs & Coaches", href: null },
        { label: "Onsite Lead", val: "Available for Large Delegations", href: null },
      ],
    },
  ];

  // Key airport hubs & coverage details
  const airportHubs = [
    {
      city: "Sydney Kingsford Smith (SYD)",
      state: "New South Wales",
      terminals: "T1 International, T2 & T3 Domestic",
      meetingPoint: "Arrivals Hall Chauffeur Zone with Digital Nameboard",
      phone: "+61 404 410 000",
    },
    {
      city: "Melbourne Tullamarine (MEL)",
      state: "Victoria",
      terminals: "T1, T2 International, T3 & T4 Domestic",
      meetingPoint: "Chauffeur Meeting Bays directly inside Arrivals",
      phone: "+61 404 410 000",
    },
    {
      city: "Brisbane & Gold Coast (BNE / OOL)",
      state: "Queensland",
      terminals: "Brisbane Domestic & Intl, Gold Coast Coolangatta",
      meetingPoint: "Inside terminal meet & greet with luggage escort",
      phone: "+61 404 410 000",
    },
    {
      city: "Canberra Airport (CBR)",
      state: "ACT",
      terminals: "Main Terminal & VIP / Diplomatic Apron",
      meetingPoint: "Priority Chauffeur Express Lane & Arrivals Lounge",
      phone: "+61 404 410 000",
    },
    {
      city: "Perth Airport (PER)",
      state: "Western Australia",
      terminals: "Terminals T1 - T4",
      meetingPoint: "Flight-tracked arrivals greeting with corporate nameplate",
      phone: "+61 404 410 000",
    },
    {
      city: "Adelaide Airport (ADL)",
      state: "South Australia",
      terminals: "Main Terminal Arrivals",
      meetingPoint: "Chauffeur waiting lounge opposite baggage carousel",
      phone: "+61 404 410 000",
    },
  ];

  // Contact FAQs
  const faqs = [
    {
      q: "How will I locate my chauffeur upon arrival at the airport?",
      a: "Your uniformed chauffeur will be stationed inside the arrivals terminal holding a discreet digital electronic tablet bearing your name or corporate group title. You will also receive an SMS message prior to landing containing your driver's direct mobile number and vehicle registration.",
    },
    {
      q: "What happens if my inbound flight is delayed or rescheduled?",
      a: "We continuously monitor all commercial and private flights in real time through automated ADS-B flight radar systems. Even if your flight is delayed by several hours, your chauffeur will adjust pickup timing at no additional penalty.",
    },
    {
      q: "How much complimentary waiting time is included for airport transfers?",
      a: "We provide 60 minutes of complimentary waiting time for all International arrivals (starting from the moment wheels touch down to allow for passport control and baggage reclamation) and 30 minutes for Domestic flights.",
    },
    {
      q: "How can my company establish a corporate billing account?",
      a: "We provide seamless corporate travel accounts with 30-day payment terms, consolidated monthly GST invoices, and priority vehicle allocation. You can select 'Corporate & Business Account' in the enquiry form above or email accounts@sydairporttransfer.com.au.",
    },
    {
      q: "What is your cancellation and booking amendment policy?",
      a: "Standard airport and point-to-point transfer bookings can be cancelled or altered without penalty up to 2 hours prior to scheduled pickup. For full details or last-minute adjustments, contact our 24/7 dispatch desk on +61 404 410 000.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans overflow-x-hidden selection:bg-[#c8a05c]/30 selection:text-[#f3dfb9]">
      {/* Background ambient luxury glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-[#c8a05c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/4 w-[36rem] h-[36rem] bg-[#c8a05c]/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222736_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Unified Global Header & Navbar */}
      <Navbar currentPath="/contact-us" />

      {/* HERO SECTION (Mirroring Hughes contact-us layout) */}
      <section className="relative z-10 w-full pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-white/10 overflow-hidden">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/hero-bg.jpg"
            alt="SYD Airport Transfer Operations Desk"
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
            <span className="text-zinc-200 font-medium">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-xs font-semibold uppercase tracking-wider text-[#e8c683] mb-4">
              <span>★</span> 24/7 Nationwide Support &amp; Dispatch
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12]">
              Contact Us
            </h1>

            {/* Subheading matching Hughes statement */}
            <p className="mt-4 text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed">
              SYD Airport Transfer operates 24 hours a day, 7 days a week, 365 days a year across Australia.
            </p>

            {/* Action Buttons (matching Hughes hero CTAs) */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link
                href="/book"
                className="px-8 py-3.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#141009] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Book Now
              </Link>
              <a
                href="#enquiry-form"
                className="px-8 py-3.5 rounded border border-white/40 hover:border-white text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all bg-white/5 hover:bg-white/10"
              >
                Instant Enquiry
              </a>
              <a
                href="tel:+61404410000"
                className="px-6 py-3.5 rounded border border-[#c8a05c]/50 text-[#e8c683] hover:bg-[#c8a05c]/10 font-semibold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-[#c8a05c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                <span>Call +61 404 410 000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONNECT BAR */}
      <section className="relative z-10 w-full py-6 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="w-12 h-12 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#e8c683]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Live Availability</div>
              <div className="text-sm font-bold text-white mt-0.5">24/7 All Australian Airports</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="w-12 h-12 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#e8c683]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Priority Email</div>
              <a href="mailto:info@sydairporttransfer.com.au" className="text-sm font-bold text-[#e8c683] hover:underline mt-0.5 block">
                info@sydairporttransfer.com.au
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="w-12 h-12 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#e8c683]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Fixed Pricing</div>
              <div className="text-sm font-bold text-white mt-0.5">Tolls &amp; Airport Parking Included</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CONTACT DEPARTMENTS (Hughes Australia sections) */}
      <section className="relative z-10 w-full py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
            Communication Channels
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white">
            Dedicated Service Departments
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Connect directly with our specialized teams for reservations, corporate accounts, event transport, and customer relations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#c8a05c]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                    {dept.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#e8c683] bg-[#c8a05c]/10 border border-[#c8a05c]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    {dept.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-white">{dept.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">{dept.desc}</p>

                <div className="mt-6 space-y-3 pt-6 border-t border-white/10 text-xs sm:text-sm">
                  {dept.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-zinc-400 font-medium">{item.label}:</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#e8c683] hover:text-white font-semibold transition-colors"
                        >
                          {item.val}
                        </a>
                      ) : (
                        <span className="text-white font-medium">{item.val}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Priority Dispatch</span>
                <a
                  href="#enquiry-form"
                  onClick={() => setFormData((prev) => ({ ...prev, subject: `${dept.title} Request` }))}
                  className="text-xs font-bold text-[#c8a05c] hover:text-[#e8c683] flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Submit Enquiry</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE ENQUIRY FORM & HEAD OFFICE (Split Section) */}
      <section id="enquiry-form" className="relative z-10 w-full py-20 bg-zinc-950/70 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Head Office & Hughes-Style Statement */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
                  National Presence
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  SYD Airport Transfer Head Office &amp; Operations
                </h2>
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  SYD Airport Transfer is Australia’s premier national chauffeur network, operating across all capital cities, key metropolitan business centres, and regional gateway airports.
                </p>
              </div>

              {/* Head Office Address Box */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Operations Flagship Center</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      Sydney Airport Corporate Precinct<br />
                      Mascot, NSW 2020 Australia
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#c8a05c] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Live Chauffeur Dispatch Desk Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Booking Reassurance Box */}
              <div className="p-6 rounded-xl border border-[#c8a05c]/30 bg-[#c8a05c]/5">
                <div className="text-sm font-semibold text-[#e8c683]">Need Immediate Transport?</div>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  For urgent departures or flight arrivals within the next 4 hours, we advise using our direct automated booking portal or telephoning our dispatch line directly.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="px-5 py-2.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-black text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Online Booking System
                  </Link>
                  <a
                    href="tel:+61404410000"
                    className="px-5 py-2.5 rounded border border-[#c8a05c]/60 hover:border-[#c8a05c] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    +61 404 410 000
                  </a>
                </div>
              </div>

              {/* Service Standards Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Our Communication Guarantee</div>
                {[
                  "Enquiries acknowledged within 60 minutes during business hours",
                  "Complimentary flight tracking on all confirmed transfers",
                  "Direct SMS confirmation with chauffeur contact 2 hours prior",
                  "Zero spam — your privacy is protected under strict confidentiality",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-zinc-300">
                    <svg className="w-4 h-4 text-[#e8c683] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Luxury Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl relative">
                <div className="mb-6">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#c8a05c]">
                    Direct Dispatch Inbox
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    Send Us an Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Please provide your travel specifications or enquiry details below.
                  </p>
                </div>

                {formStatus === "success" ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold font-serif text-white">Enquiry Received Successfully</h4>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting SYD Airport Transfer. Our operations management team has received your message and will respond promptly.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setFormStatus("idle")}
                        className="px-6 py-2.5 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-black text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {formStatus === "error" && errorMessage && (
                      <div className="p-4 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Full Name <span className="text-[#c8a05c]">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Email Address <span className="text-[#c8a05c]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com.au"
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+61 400 000 000"
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Subject / Booking Reference
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="e.g. VIP Transfer Request / Flight VA-814"
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        Message Details <span className="text-[#c8a05c]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please include dates, flight numbers, passenger headcount, luggage quantities, or any custom travel requirements..."
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#c59e5f] to-[#e4bf7e] hover:from-[#d6af70] hover:to-[#f0cb8c] text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-[#c8a05c]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {formStatus === "loading" ? (
                          <>
                            <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            <span>Transmitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Enquiry to Dispatch</span>
                            <span>→</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-500 text-center">
                      Protected by 256-bit SSL encryption. All details handled in strict compliance with Australian Privacy Principles.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NATIONWIDE AIRPORT MEETING POINTS (Hughes Key Hubs) */}
      <section className="relative z-10 w-full py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
            Terminal Precision
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white">
            Airport Meeting Points &amp; Hub Contacts
          </h2>
          <p className="mt-3 text-sm text-zinc-300">
            Designated chauffeur meeting locations at Australia&apos;s leading domestic and international terminals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airportHubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#c8a05c]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c8a05c] bg-[#c8a05c]/10 px-2 py-0.5 rounded">
                    {hub.state}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white mt-3">{hub.city}</h3>
                <div className="mt-2 text-xs text-zinc-400">
                  <span className="text-zinc-500">Terminals:</span> {hub.terminals}
                </div>
                <div className="mt-3 p-3 rounded-lg border border-white/5 bg-black/40 text-xs text-zinc-300 leading-relaxed">
                  <span className="text-[#e8c683] font-semibold block mb-0.5">Meeting Point:</span>
                  {hub.meetingPoint}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href={`tel:${hub.phone.replace(/\s+/g, "")}`}
                  className="text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 text-[#c8a05c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                  <span>{hub.phone}</span>
                </a>
                <Link
                  href="/book"
                  className="font-semibold text-[#c8a05c] hover:text-[#e8c683] uppercase tracking-wider text-[11px]"
                >
                  Book Hub →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ Accordion) */}
      <section className="relative z-10 w-full py-20 bg-black/40 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#c8a05c] uppercase">
              Assistance &amp; Clarity
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Immediate answers to common queries regarding reservations, airport logistics, and payments.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-[#c8a05c]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-100 hover:text-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#c8a05c] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#c8a05c]/20" : ""
                        }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER (Matching About Us and Home style) */}
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
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Sydney Airport (SYD)</Link></li>
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Melbourne Airport (MEL)</Link></li>
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Brisbane Airport (BNE)</Link></li>
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Gold Coast Airport (OOL)</Link></li>
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Canberra Airport (CBR)</Link></li>
                <li><Link href="/about-us#locations" className="hover:text-white transition-colors">Perth &amp; Adelaide</Link></li>
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
