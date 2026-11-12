"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCustomerBookings, getStoredCustomer } from "@/utils/customerAuth";

export default function CustomerBookingsPage() {
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filterTab, setFilterTab] = useState("all"); // 'all', 'upcoming', 'completed', 'cancelled'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cust = getStoredCustomer();
    setCustomer(cust);
    const list = getCustomerBookings();
    setBookings(list);

    const onUpdate = () => {
      setBookings(getCustomerBookings());
    };
    window.addEventListener("syd_customer_bookings_changed", onUpdate);
    return () => window.removeEventListener("syd_customer_bookings_changed", onUpdate);
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickup?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dropoff?.toString().toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === "all") return true;
    if (filterTab === "upcoming") {
      return ["pending", "confirmed", "assigned", "on_the_way", "arrived", "in_progress"].includes(
        b.status
      );
    }
    if (filterTab === "completed") return b.status === "completed";
    if (filterTab === "cancelled") return b.status === "cancelled";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "on_the_way":
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Live: On The Way
          </span>
        );
      case "confirmed":
      case "assigned":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/40">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#c8a05c]">
            Customer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Welcome back, {customer?.fullName || "Valued Passenger"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your past and upcoming airport &amp; private transfers.
          </p>
        </div>

        <Link
          href="/book"
          className="self-start sm:self-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(200,160,92,0.4)] transition-all flex items-center gap-2"
        >
          <span>+</span>
          <span>Book New Transfer</span>
        </Link>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/10 text-xs overflow-x-auto">
          {[
            { id: "all", label: "All Rides" },
            { id: "upcoming", label: "Upcoming / Active" },
            { id: "completed", label: "Past Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterTab === tab.id
                  ? "bg-[#c8a05c] text-black font-bold shadow"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking number or place..."
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:border-[#c8a05c] outline-none"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/40 border border-white/5 rounded-2xl">
          <p className="text-zinc-400 text-sm">No bookings found matching your criteria.</p>
          <Link
            href="/book"
            className="mt-4 inline-block px-4 py-2 rounded-lg bg-[#c8a05c]/20 border border-[#c8a05c] text-[#c8a05c] text-xs font-semibold hover:bg-[#c8a05c] hover:text-black transition-all"
          >
            Create Your First Booking
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((b) => {
            const isLive = ["on_the_way", "arrived", "in_progress"].includes(b.status);
            const dateStr = b.pickupTime
              ? new Date(b.pickupTime).toLocaleString("en-AU", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Date pending";

            return (
              <div
                key={b.bookingNumber || b.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-zinc-900/70 backdrop-blur-md flex flex-col justify-between gap-5 ${
                  isLive
                    ? "border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/30"
                    : "border-white/10 hover:border-[#c8a05c]/40 hover:bg-zinc-900/90"
                }`}
              >
                {/* Header row: Reference, Date, Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#e8c683]">
                      #{b.bookingNumber}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                      {b.vehicleType || "Chauffeur"}
                    </span>
                    {b.flightNumber && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/30">
                        Flight: {b.flightNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">{dateStr}</span>
                    {getStatusBadge(b.status)}
                  </div>
                </div>

                {/* Middle row: Route Pickup & Dropoff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#c8a05c] mt-1 shrink-0" />
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                          Pickup Location
                        </div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {typeof b.pickup === "object" ? b.pickup.address : b.pickup}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                          Destination / Dropoff
                        </div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {typeof b.dropoff === "object" ? b.dropoff.address : b.dropoff}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right sub-column: Passengers & Fare */}
                  <div className="flex md:flex-col justify-between md:justify-center items-end border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 text-right">
                    <div>
                      <span className="text-xs text-zinc-400">Fixed Upfront Fare:</span>
                      <div className="text-xl font-bold font-serif text-[#e8c683]">
                        ${b.fare?.total || 0} {b.fare?.currency || "AUD"}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 capitalize flex items-center justify-end gap-1.5">
                        <span>Payment:</span>
                        <span className="text-zinc-200">{b.paymentStatus || "pending"}</span>
                        {b.paymentMethod && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-wide text-zinc-300 font-mono">
                            {b.paymentMethod}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-white/5">
                  <Link
                    href={`/customer/track/${b.bookingNumber}`}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isLive
                        ? "bg-amber-400 text-black hover:bg-amber-300 shadow-md shadow-amber-400/20"
                        : "bg-[#c8a05c]/20 hover:bg-[#c8a05c] hover:text-black text-[#e8c683] border border-[#c8a05c]/50"
                    }`}
                  >
                    📍 Live Tracking &amp; Driver
                  </Link>

                  <Link
                    href={`/customer/invoices/${b.bookingNumber}`}
                    className="px-3.5 py-2 rounded-xl border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    🧾 View Invoice
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

