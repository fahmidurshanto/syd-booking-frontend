"use client";

import React from "react";

export default function ChauffeursAtYourService() {
  const serviceBadges = [
    {
      title: "Australia's Premier",
      subtitle: "Chauffeur Service",
      icon: (
        // Australia Continent / Map silhouette
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.5 15.2c-.3-.2-.8-.2-1.1 0l-1.4.9c-.3.2-.5.5-.5.9 0 .4.2.8.5 1l.8.6c.3.2.7.2 1 0l1-.7c.3-.2.4-.6.3-1-.1-.3-.3-.6-.6-.7zm-4.7-3.4c-.4-.4-1.1-.3-1.4.2l-.7 1.1c-.2.3-.2.8 0 1.1l.9 1.3c.3.4.8.5 1.3.3.4-.2.7-.6.7-1.1v-1.6c0-.6-.3-1.1-.8-1.3zm3.7-5.5c-.5-.3-1.1-.1-1.4.4l-1.3 2c-.2.4-.2.8 0 1.2.2.4.6.6 1 .6h1.7c.6 0 1-.4 1-1v-1.7c0-.7-.4-1.2-1-1.5zm-8.8 1.9c-.4-.3-1-.2-1.3.2l-2.4 3.1c-.3.4-.3.9 0 1.3l1.8 2.2c.3.4.9.5 1.4.3.4-.2.7-.7.7-1.2v-4.4c0-.7-.5-1.2-1.2-1.5zm-4.5 7.8c-.3-.3-.8-.3-1.2 0l-1.1 1.1c-.3.3-.3.8 0 1.1l1.4 1.4c.3.3.8.3 1.1 0l1.1-1.1c.3-.3.3-.8 0-1.1l-1.3-1.4z" />
          <path
            d="M20.5 8c-.6-1.5-1.7-2.7-3-3.5-1.6-1-3.5-1.5-5.5-1.5C6.5 3 2 7.5 2 13c0 2.2.7 4.2 2 5.9.3.4.8.7 1.3.7h.2c.5-.1.9-.4 1.1-.9l.6-1.5c.2-.5.1-1.1-.3-1.5l-.8-.8c-.3-.3-.4-.7-.3-1.1.3-1.4 1.2-2.6 2.4-3.3.4-.2.9-.2 1.3.1l1.3 1c.4.3.9.4 1.4.2.5-.2.8-.7.8-1.2v-.8c0-.6.4-1.1 1-1.2.5-.1 1.1.2 1.3.7l.6 1.4c.2.5.7.8 1.2.8h1.2c.6 0 1.1.4 1.2 1 .1.5-.1 1.1-.6 1.4l-1.2.8c-.4.3-.6.8-.5 1.3.1.5.5.9 1 1l1.4.3c.6.1 1.1.6 1.1 1.2v.5c0 .4.2.8.6 1 .4.2.9.1 1.2-.2 1.1-1.2 1.8-2.8 2-4.5.3-2.1-.2-4.2-1.4-5.9z"
            opacity="0.85"
          />
        </svg>
      ),
    },
    {
      title: "Nationwide Network &",
      subtitle: "Global Reach",
      icon: (
        // Globe with meridian and latitude lines
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 4.5 9.5 14.5 14.5 0 0 1-4.5 9.5 14.5 14.5 0 0 1-4.5-9.5A14.5 14.5 0 0 1 12 2.5z" />
        </svg>
      ),
    },
    {
      title: "Full GPS Tracking",
      subtitle: "On All Vehicles",
      icon: (
        // Car with Pin / Location Tracking
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2a4 4 0 0 0-4 4c0 3 4 6.5 4 6.5s4-3.5 4-6.5a4 4 0 0 0-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 17l1.5-4.5A2 2 0 0 1 7.4 11h9.2a2 2 0 0 1 1.9 1.5L20 17v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4z"
          />
          <circle cx="7.5" cy="16.5" r="1" fill="currentColor" />
          <circle cx="16.5" cy="16.5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Here To Help",
      subtitle: "24 Hours A Day",
      icon: (
        // Headset / Customer Dispatch Support
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12a9 9 0 0 1 18 0v4a3 3 0 0 1-3 3h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2v-0.5a7 7 0 0 0-14 0V12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3v-4z"
          />
        </svg>
      ),
    },
    {
      title: "Decades Of",
      subtitle: "Excellence",
      icon: (
        // Trophy Award of Excellence
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 21h8m-4-4v4M5 4h14v4a7 7 0 0 1-14 0V4zm0 2H3a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h0m14-7h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h0"
          />
        </svg>
      ),
    },
    {
      title: "Large Events &",
      subtitle: "Conference Experts",
      icon: (
        // Calendar & Event Coordination
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 2v3M16 2v3M3.5 9.09h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 9h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"
          />
        </svg>
      ),
    },
    {
      title: "Courteous & Reliable",
      subtitle: "Chauffeurs",
      icon: (
        // Uniformed Chauffeur / Driver
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#e8c683] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          {/* Chauffeur peaked cap */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8.5c0-.8.6-1.5 1.5-1.5h13c.9 0 1.5.7 1.5 1.5l-.8 2H4.8L4 8.5zm-1 3.5h18s-1.5 1.5-4 1.5H7c-2.5 0-4-1.5-4-1.5z"
          />
          {/* Head & Collar */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 13.5v1.2a4 4 0 0 0 8 0v-1.2M4 21c0-2.8 3.6-4.5 8-4.5s8 1.7 8 4.5v0.5H4V21z"
          />
          {/* Tie */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 16.5l1 3 1-3-1-.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="chauffeurs-at-your-service-heading"
      className="relative z-10 w-full py-16 sm:py-24 bg-gradient-to-b from-[#0b0c10] via-[#0f1118] to-[#0b0c10] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow accents matching current theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[20rem] bg-[#c8a05c]/5 rounded-full blur-[140px]" />
        <div className="absolute -top-10 left-1/4 w-[24rem] h-[16rem] bg-blue-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtitle tag / badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c8a05c]/30 bg-[#c8a05c]/10 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#e8c683] mb-4">
            <span>★</span> Australia&apos;s Trusted Private Chauffeurs
          </div>

          {/* Main Title */}
          <h2
            id="chauffeurs-at-your-service-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight"
          >
            Chauffeurs At Your Service
          </h2>

          {/* Subtle gold divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c8a05c] to-transparent mx-auto mt-4 mb-6" />

          {/* Body Description */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Discover effortless luxury with SYD Airport Transfer. Specialising in seamless airport
            transfers, executive corporate travel, and bespoke private tours, our immaculate
            European fleet and discreet, professional chauffeurs are dedicated to delivering a
            smooth, first-class journey every time you ride with us.
          </p>
        </div>

        {/* 7 Feature Badges Row */}
        <div className="mt-14 sm:mt-18">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-5 justify-items-center items-start">
            {serviceBadges.map((badge, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center cursor-default max-w-[150px] w-full transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Circular Badge Container matching luxury dark-gold combo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-b from-[#1c2230] to-[#0c0e14] border border-[#c8a05c]/40 shadow-lg shadow-black/60 group-hover:border-[#e8c683] group-hover:shadow-[#c8a05c]/20 transition-all duration-300">
                  {/* Subtle inner radial glow */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

                  {/* Icon */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {badge.icon}
                  </div>
                </div>

                {/* Badge Label */}
                <div className="mt-3.5 text-xs sm:text-[13px] font-medium text-zinc-300 group-hover:text-white leading-snug transition-colors">
                  <span className="block">{badge.title}</span>
                  <span className="block text-zinc-400 group-hover:text-[#e8c683] transition-colors">
                    {badge.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
