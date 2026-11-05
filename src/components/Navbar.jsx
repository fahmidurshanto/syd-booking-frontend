"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
const ADMIN_LOGIN_URL = `${ADMIN_URL.replace(/\/+$/, "")}/login`;

const NAV_ITEMS = [
  {
    label: "Airport Transfers",
    href: "/book/chauffeur",
    dropdown: [
      {
        title: "Sydney Airport Transfers",
        desc: "International & Domestic airport chauffeur transfers",
        href: "/book/chauffeur",
      },
      {
        title: "Private Flight / FBO Chauffeurs",
        desc: "Discreet tarmac & private hangar transfers",
        href: "/book/chauffeur",
      },
      {
        title: "Flight Monitoring & Meet & Greet",
        desc: "Complimentary digital nameboard inside terminal",
        href: "/about-us#at-your-service",
      },
      {
        title: "Instant Fare Estimate",
        desc: "Fixed upfront pricing with all tolls included",
        href: "/book",
      },
    ],
  },
  {
    label: "Locations",
    href: "/about-us#locations",
    dropdown: [
      {
        title: "Sydney & NSW",
        desc: "Sydney CBD, Northern Beaches, Western Sydney & Hunter Valley",
        href: "/about-us#locations",
      },
      {
        title: "Melbourne & Victoria",
        desc: "Tullamarine (MEL), Avalon, CBD & Mornington",
        href: "/about-us#locations",
      },
      {
        title: "Brisbane & Queensland",
        desc: "Brisbane (BNE), Gold Coast (OOL) & Sunshine Coast",
        href: "/about-us#locations",
      },
      {
        title: "Canberra, Adelaide & Perth",
        desc: "Nationwide executive coverage across Australia",
        href: "/about-us#locations",
      },
    ],
  },
  {
    label: "Services",
    href: "/#services",
    dropdown: [
      {
        title: "Corporate & Executive Travel",
        desc: "Confidential executive transport & roadshows",
        href: "/#services",
      },
      {
        title: "Airport Chauffeur Service",
        desc: "Reliable, on-time terminal arrivals & departures",
        href: "/book/chauffeur",
      },
      {
        title: "Chauffeur by the Hour / As Directed",
        desc: "Flexible charter for meetings, tours & events",
        href: "/book",
      },
      {
        title: "Special Events & Private Tours",
        desc: "Weddings, VIP events & scenic Australian tours",
        href: "/#services",
      },
    ],
  },
  {
    label: "The Fleet",
    href: "/about-us#fleet",
    dropdown: [
      {
        title: "Executive Sedans",
        desc: "Mercedes-Benz E-Class, BMW 5 Series, Audi A6",
        href: "/about-us#fleet",
      },
      {
        title: "Premium SUVs",
        desc: "Audi Q7, BMW X5, Lexus RX with ample luggage room",
        href: "/about-us#fleet",
      },
      {
        title: "VIP People Movers & Vans",
        desc: "Mercedes-Benz V-Class & Sprinters for groups up to 14",
        href: "/about-us#fleet",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
    dropdown: [
      {
        title: "Our Heritage & Standards",
        desc: "Australia's premier chauffeur & private fleet network",
        href: "/about-us",
      },
      {
        title: "At Your Service",
        desc: "Our chauffeur commitment & premium guarantees",
        href: "/about-us#at-your-service",
      },
      {
        title: "Frequently Asked Questions",
        desc: "Luggage limits, cancellation policies & payment terms",
        href: "/about-us#faq",
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export default function Navbar({ currentPath = "/" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (idx) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileSubmenu = (idx) => {
    setMobileExpandedIndex(mobileExpandedIndex === idx ? null : idx);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="relative z-30 w-full">
      {/* Top bar (contact utility) */}
      <div className="top-bar-contact w-full border-b border-white/10 bg-black/40 backdrop-blur-sm">
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
      <div className="main-navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/50 shadow-inner group-hover:border-[#e7c27d] transition-all">
            <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider drop-shadow-md">
              SYD
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base sm:text-xl font-serif tracking-[0.2em] text-[#e8c683] font-bold uppercase leading-none">
              SYD Airport
            </span>
            <span className="text-base sm:text-xl font-serif tracking-[0.2em] text-white font-bold uppercase leading-none mt-1">
              Transfer
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.36em] text-zinc-300 uppercase font-light mt-1.5 leading-none">
              Chauffeur Services
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-[13px] font-medium text-zinc-200">
          {NAV_ITEMS.map((item, idx) => {
            const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
            const isActive = currentPath === item.href;
            const isOpen = activeDropdown === idx;

            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => hasDropdown && handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 transition-colors duration-200 hover:text-white ${
                    isActive ? "text-[#e8c683] font-semibold" : "text-zinc-200"
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && isOpen && (
                  <div
                    className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="rounded-xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl p-2.5 shadow-2xl shadow-black/80 ring-1 ring-white/5">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/sub block px-3.5 py-2.5 rounded-lg hover:bg-white/[0.07] transition-all duration-150"
                        >
                          <div className="text-xs font-semibold text-zinc-100 group-hover/sub:text-[#e8c683] transition-colors">
                            {subItem.title}
                          </div>
                          {subItem.desc && (
                            <div className="text-[11px] text-zinc-400 group-hover/sub:text-zinc-300 mt-0.5 leading-snug line-clamp-2">
                              {subItem.desc}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Book Now outlined pill button */}
          <Link
            href="/book"
            className="ml-2 px-5 py-2 rounded border border-white/70 hover:border-white text-white text-xs tracking-wider font-semibold uppercase transition-all duration-200 hover:bg-white/10 shadow-sm"
          >
            Book Now
          </Link>

          {/* Sign In Golden Button */}
          <Link
            href={ADMIN_LOGIN_URL}
            className="px-4 py-2 rounded bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md shadow-[#c8a05c]/20"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile / Tablet Hamburger Button */}
        <div className="flex xl:hidden items-center gap-3">
          <Link
            href="/book"
            className="px-3.5 py-1.5 rounded border border-white/60 text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Book Now
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-200 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${
                  mobileMenuOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${
                  mobileMenuOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-zinc-950/98 backdrop-blur-xl border-b border-white/10 px-6 py-5 max-h-[85vh] overflow-y-auto space-y-3.5">
          {NAV_ITEMS.map((item, idx) => {
            const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0;
            const isExpanded = mobileExpandedIndex === idx;

            return (
              <div key={item.label} className="border-b border-white/5 pb-2.5">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                    className="text-sm font-medium text-zinc-200 hover:text-white py-1 transition-colors"
                  >
                    {item.label}
                  </Link>

                  {hasDropdown && (
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(idx)}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#e8c683]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasDropdown && isExpanded && (
                  <div className="mt-2 ml-3 pl-3 border-l border-white/10 space-y-2 py-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-xs text-zinc-400 hover:text-[#e8c683] transition-colors"
                      >
                        <div className="font-semibold text-zinc-300">{subItem.title}</div>
                        {subItem.desc && (
                          <div className="text-[10px] text-zinc-500 mt-0.5">{subItem.desc}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Action Buttons in Mobile Drawer */}
          <div className="pt-3 space-y-2.5">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-3 rounded-lg border border-white/40 text-white font-bold text-xs tracking-wider uppercase transition-colors hover:bg-white/10"
            >
              Book Now
            </Link>
            <Link
              href={ADMIN_LOGIN_URL}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-3 rounded-lg bg-[#c59e5f] hover:bg-[#d6af70] text-[#1a140b] font-bold text-xs tracking-wider uppercase transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

