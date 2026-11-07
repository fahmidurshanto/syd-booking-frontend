"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearCustomerSession, getStoredCustomer } from "@/utils/customerAuth";

export default function CustomerHeader({ customer, title, subtitle }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentCustomer, setCurrentCustomer] = useState(customer);

  useEffect(() => {
    if (!currentCustomer) {
      const stored = getStoredCustomer();
      if (stored) setCurrentCustomer(stored);
    }
  }, [currentCustomer]);

  const handleLogout = () => {
    clearCustomerSession();
    router.push("/customer/login");
  };

  const navLinks = [
    { label: "Bookings", href: "/customer/bookings" },
    { label: "Book a Ride", href: "/book" },
    { label: "Profile", href: "/customer/profile" },
  ];

  return (
    <header className="relative z-20 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & Portal Label */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full border border-[#d3ad6b]/60 flex items-center justify-center bg-black/50 group-hover:border-[#e7c27d] transition-all">
              <span className="text-[#c8a05c] font-sans font-black text-xs tracking-wider">
                SYD
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-serif tracking-[0.18em] text-[#e8c683] font-bold uppercase leading-tight">
                SYD Transport
              </span>
              <span className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-light">
                Passenger Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10 text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-[#c8a05c] text-black font-semibold shadow-sm"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentCustomer ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-white">
                  {currentCustomer.fullName}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {currentCustomer.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/customer/login"
                className="px-3.5 py-1.5 rounded-lg bg-[#c8a05c] text-black font-bold text-xs hover:bg-[#d6af70] transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

