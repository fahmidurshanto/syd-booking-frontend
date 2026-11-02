"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I find my chauffeur upon arrival at Sydney Airport?",
      a: "Your uniformed chauffeur will be waiting inside the arrivals hall holding an electronic digital nameboard with your name or corporate group title. In addition, you will receive an automated SMS prior to landing with your chauffeur's direct mobile number and vehicle registration.",
    },
    {
      q: "What happens if my inbound flight is delayed or rescheduled?",
      a: "We continuously monitor all commercial flight arrivals in real time using automated ADS-B flight radar systems. If your flight arrives early or is delayed by several hours, your pickup schedule is updated automatically at no extra penalty, ensuring your driver is ready the moment you exit.",
    },
    {
      q: "How much complimentary waiting time is included with airport bookings?",
      a: "We provide 60 minutes of complimentary waiting time on all International arrivals (starting from the time wheels touch down to give you ample time for customs and baggage retrieval) and 30 minutes on Domestic flights.",
    },
    {
      q: "Are tolls, airport parking fees, and GST included in the price?",
      a: "Yes. All SYD Airport Transfer quotes feature fixed, transparent upfront pricing. Airport pickup/terminal fees, standard road tolls, and GST are 100% included with zero hidden surcharges or peak-hour surges.",
    },
    {
      q: "What vehicle types are available for families or corporate groups?",
      a: "Our prestige fleet includes Executive Sedans (Mercedes-Benz E-Class, BMW 5 Series, Audi A6), Premium SUVs (Audi Q7, BMW X5), and VIP People Movers (Mercedes-Benz V-Class and luxury Sprinter vans) that accommodate from 1 to 14 passengers with extensive luggage holds.",
    },
    {
      q: "Can I request Australian safety-certified child or booster seats?",
      a: "Yes. We supply Australian safety-standard compliant rear-facing baby capsules, forward-facing child seats, and booster seats. You can easily specify child seat requirements during online reservation checkout.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-labelledby="faq-section-heading"
      className="relative z-10 w-full py-20 sm:py-28 bg-[#0b0c10] border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient luxury glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[34rem] h-[34rem] bg-[#c8a05c]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -right-32 w-[32rem] h-[32rem] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f2433_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtitle tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#e8c683] mb-4">
            <span>★</span> Clear, Transparent &amp; Reliable
          </div>

          {/* Main Title */}
          <h2
            id="faq-section-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight"
          >
            Frequently Asked Questions
          </h2>

          {/* Gold Divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8a05c] to-transparent mx-auto mt-4 mb-6" />

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Everything you need to know about our private chauffeur transfers, airport meet &amp; greet,
            flight tracking, and fixed rates. Have a specific enquiry? Our 24/7 team is ready on{" "}
            <a
              href="tel:+61404410000"
              className="text-[#e8c683] hover:underline font-semibold"
            >
              +61 404 410 000
            </a>
            .
          </p>
        </div>

        {/* FAQs Accordion List */}
        <div className="mt-12 sm:mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#c8a05c]/60 bg-white/[0.04] shadow-xl shadow-black/40"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-serif font-semibold text-white tracking-wide">
                    {faq.q}
                  </span>

                  {/* Toggle Arrow Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#c8a05c] border-[#c8a05c] text-black rotate-180"
                        : "bg-white/5 border-white/10 text-[#e8c683]"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 transform transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-white/5 mt-1">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-[#c8a05c]/30 bg-gradient-to-r from-[#171b26] via-[#12141c] to-[#171b26] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              Ready to experience first-class travel?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Book your private chauffeur online in under 2 minutes with instant confirmation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/book"
              className="px-6 py-3 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#c8a05c]/20"
            >
              Book Now
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 rounded border border-white/20 hover:border-white text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all bg-white/5 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
