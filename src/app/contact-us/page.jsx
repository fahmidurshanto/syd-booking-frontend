"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ContactUsPage() {
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

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0b0c10] text-white font-sans overflow-x-hidden selection:bg-[#c8a05c]/30 selection:text-[#f3dfb9]">
      {/* Background ambient luxury glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-[#c8a05c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#222736_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Global Navbar */}
      <Navbar currentPath="/contact-us" />

      {/* Hero Header */}
      <section className="relative z-10 w-full pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-xs font-semibold uppercase tracking-widest text-[#e8c683] mb-4">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Contact Our Team
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our chauffeur transfers or require custom arrangements? Reach out to us directly or send a message below.
          </p>
        </div>
      </section>

      {/* Main Content: Offices & Direct Contact (Left) + Contact Form (Right) */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (5 cols): Office Addresses & Direct Lines */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c8a05c] uppercase block mb-1">
                Locations &amp; Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Our Global Offices
              </h2>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+61404410000"
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c8a05c]/40 transition-all group"
              >
                <span className="text-[10px] uppercase font-bold text-[#c8a05c] tracking-wider block">
                  Direct Phone
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#e8c683] transition-colors mt-1 block">
                  +61 404 410 000
                </span>
              </a>

              <a
                href="mailto:info@sydairporttransfer.com.au"
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#c8a05c]/40 transition-all group"
              >
                <span className="text-[10px] uppercase font-bold text-[#c8a05c] tracking-wider block">
                  Email Support
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-[#e8c683] transition-colors mt-1 block truncate">
                  info@sydairporttransfer.com.au
                </span>
              </a>
            </div>

            {/* Office Locations */}
            <div className="space-y-4 pt-2">
              {/* Head Office 01 (Sydney) */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#c8a05c]/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#c8a05c]/15 text-[#e8c683] mb-1">
                      Headquarters
                    </div>
                    <h3 className="text-base font-bold text-white">Head Office 01 (Sydney)</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      25 Cairds Avenue<br />
                      NSW - 2200, Sydney, Australia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch Office 02 (Sydney) */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#c8a05c]/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-zinc-300 mb-1">
                      Sydney Branch
                    </div>
                    <h3 className="text-base font-bold text-white">Branch Office 02 (Sydney)</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      43 Watkin Street,<br />
                      NSW - 2216, Sydney, Australia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch Office 03 (Joypurhat) */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#c8a05c]/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#c8a05c]/10 border border-[#c8a05c]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#c8a05c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-zinc-300 mb-1">
                      International Branch
                    </div>
                    <h3 className="text-base font-bold text-white">Branch Office 03 (Joypurhat)</h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      House/Holding No. 263,<br />
                      Baridhara, Road 01, Sector 01,<br />
                      Joypurhat Sadar, Joypurhat - 5900
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Booking */}
            <div className="p-4 rounded-xl border border-[#c8a05c]/30 bg-[#c8a05c]/5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c683]">Ready to Reserve?</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Instant online booking with transparent upfront fares.</p>
              </div>
              <Link
                href="/book"
                className="px-4 py-2 rounded-lg bg-[#c59e5f] hover:bg-[#d6af70] text-black font-bold text-xs uppercase tracking-wider transition-all shrink-0"
              >
                Book Now →
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Clean Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xs">
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c8a05c] uppercase block">
                  Send a Message
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-white">
                  General &amp; Booking Enquiry
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                  Fill in the form below and our dispatch team will respond shortly.
                </p>
              </div>

              {formStatus === "success" ? (
                <div className="p-8 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">Message Received</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    Thank you for contacting SYD Airport Transfer. Our operations desk has received your inquiry and will contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="inline-block mt-2 px-5 py-2.5 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formStatus === "error" && (
                    <div className="p-3.5 rounded-lg border border-red-500/40 bg-red-950/30 text-xs text-red-200">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Full Name <span className="text-[#c8a05c]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Email Address <span className="text-[#c8a05c]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+61 400 000 000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. VIP Transfer / Quote Request"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Message <span className="text-[#c8a05c]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please write your questions or requirements here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c8a05c] transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#c59e5f] to-[#e4bf7e] hover:from-[#d6af70] hover:to-[#f0cb8c] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#c8a05c]/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Global Clean Luxury Footer */}
      <Footer />
    </div>
  );
}
