"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCustomerBookings } from "@/utils/customerAuth";

export default function CustomerInvoicePage() {
  const params = useParams();
  const bookingNumber = params.bookingNumber;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const list = getCustomerBookings();
    const found = list.find((b) => b.bookingNumber === bookingNumber);
    if (found) setBooking(found);
  }, [bookingNumber]);

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Invoice Not Found</h2>
        <Link
          href="/customer/bookings"
          className="inline-block px-4 py-2 rounded-xl bg-[#c8a05c] text-black text-xs font-bold uppercase tracking-wider"
        >
          Back to Bookings
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const fareTotal = booking.fare?.total || 115;
  const gst = Number((fareTotal * 0.1).toFixed(2));
  const baseFare = Number((fareTotal - gst).toFixed(2));

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header utility bar */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/customer/bookings"
          className="text-xs text-zinc-400 hover:text-[#c8a05c] transition-colors"
        >
          ← Back to Bookings
        </Link>
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-[#c8a05c] hover:bg-[#d6af70] text-black text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>🖨️</span>
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Tax Invoice Document */}
      <div
        id="tax-invoice"
        className="rounded-2xl bg-zinc-900/90 border border-white/10 p-8 sm:p-10 shadow-2xl relative space-y-8 text-white backdrop-blur-md"
      >
        {/* Brand & Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c8a05c] flex items-center justify-center font-serif text-[#c8a05c] font-bold text-sm">
                SYD
              </div>
              <div>
                <h1 className="text-lg font-serif font-bold text-[#e8c683] tracking-wider uppercase">
                  SYD Airport Transfer &amp; Chauffeur
                </h1>
                <p className="text-[11px] text-zinc-400">
                  ABN: 48 629 104 291 • Sydney NSW Australia
                </p>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c8a05c]">
              Tax Invoice &amp; Receipt
            </span>
            <div className="font-mono text-base font-bold text-white mt-0.5">
              INV-{booking.bookingNumber}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Date:{" "}
              {new Date(booking.createdAt || Date.now()).toLocaleDateString("en-AU", {
                dateStyle: "long",
              })}
            </div>
          </div>
        </div>

        {/* Billed To and Trip Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Passenger &amp; Client Details
            </span>
            <div className="text-sm font-semibold text-white mt-1">
              {booking.passengerName || "Valued Passenger"}
            </div>
            {booking.passengerPhone && (
              <div className="text-zinc-300 mt-0.5">{booking.passengerPhone}</div>
            )}
            {booking.passengerEmail && (
              <div className="text-zinc-400 mt-0.5">{booking.passengerEmail}</div>
            )}
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Transfer Schedule
            </span>
            <div className="text-sm font-semibold text-white mt-1">
              {new Date(booking.pickupTime).toLocaleString("en-AU", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
            <div className="text-zinc-300 mt-0.5">
              Service: <span className="text-[#e8c683]">{booking.vehicleType || "Chauffeur"}</span>
            </div>
            {booking.flightNumber && (
              <div className="text-zinc-400 mt-0.5">Flight: {booking.flightNumber}</div>
            )}
          </div>
        </div>

        {/* Route Details Box */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Pickup:</span>
            <span className="text-white font-semibold">
              {typeof booking.pickup === "object" ? booking.pickup.address : booking.pickup}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Dropoff:</span>
            <span className="text-white font-semibold">
              {typeof booking.dropoff === "object" ? booking.dropoff.address : booking.dropoff}
            </span>
          </div>
        </div>

        {/* Financial Line Items */}
        <div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-2.5">Description</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Amount (AUD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3">
                  <div className="font-semibold text-white">
                    Private {booking.vehicleType || "Chauffeur"} Transfer
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Includes all airport tolls, private chauffeur service &amp; guaranteed wait time
                  </div>
                </td>
                <td className="py-3 text-center text-zinc-300">1</td>
                <td className="py-3 text-right font-medium text-white">${baseFare.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-3">
                  <div className="font-semibold text-zinc-300">GST (Goods and Services Tax 10%)</div>
                </td>
                <td className="py-3 text-center text-zinc-300">1</td>
                <td className="py-3 text-right font-medium text-zinc-300">${gst.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-white/15">
                <td colSpan={2} className="pt-4 text-sm font-bold text-white uppercase">
                  Total Amount Paid
                </td>
                <td className="pt-4 text-right text-lg font-bold font-serif text-[#e8c683]">
                  ${fareTotal.toFixed(2)} AUD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment Confirmation Badge */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓ Payment Status:</span>
            <span className="uppercase font-semibold text-white">
              {booking.paymentStatus === "paid" ? "PAID IN FULL" : booking.paymentStatus || "PENDING"}
            </span>
          </div>
          <span className="text-zinc-400 text-[11px]">Thank you for traveling with SYD.</span>
        </div>

        {/* Footer notes */}
        <div className="text-[10px] text-zinc-500 text-center pt-4 border-t border-white/5 space-y-1">
          <p>SYD Transport Pty Ltd • 24/7 Dispatch Hotline: +61 404 410 000</p>
          <p>This is an electronically generated valid tax invoice.</p>
        </div>
      </div>
    </div>
  );
}

