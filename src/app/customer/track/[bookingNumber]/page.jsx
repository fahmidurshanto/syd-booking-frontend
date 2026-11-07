"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCustomerBookings, saveCustomerBooking } from "@/utils/customerAuth";

export default function LiveTrackPage() {
  const params = useParams();
  const router = useRouter();
  const bookingNumber = params.bookingNumber;

  const [booking, setBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [modifyNote, setModifyNote] = useState("");
  const [actionNotice, setActionNotice] = useState("");

  useEffect(() => {
    const list = getCustomerBookings();
    const found = list.find((b) => b.bookingNumber === bookingNumber);
    if (found) {
      setBooking(found);
    }
  }, [bookingNumber]);

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Booking Not Found</h2>
        <p className="text-zinc-400 text-xs">
          Reference #{bookingNumber} could not be retrieved from your customer records.
        </p>
        <Link
          href="/customer/bookings"
          className="inline-block px-4 py-2 rounded-xl bg-[#c8a05c] text-black text-xs font-bold uppercase tracking-wider"
        >
          Back to Bookings
        </Link>
      </div>
    );
  }

  const handleCancelBooking = () => {
    const updated = {
      ...booking,
      status: "cancelled",
      cancellationReason: cancelReason || "Cancelled by passenger via portal",
    };
    saveCustomerBooking(updated);
    setBooking(updated);
    setShowCancelModal(false);
    setActionNotice("Your booking has been cancelled.");
  };

  const handleModifyBooking = () => {
    const updated = {
      ...booking,
      notes: `${booking.notes ? booking.notes + " | " : ""}Modification requested: ${newTime} (${modifyNote})`,
    };
    saveCustomerBooking(updated);
    setBooking(updated);
    setShowModifyModal(false);
    setActionNotice("Modification request sent to dispatch team.");
  };

  // Step stages definition
  const stages = [
    { key: "confirmed", label: "Confirmed" },
    { key: "assigned", label: "Chauffeur Assigned" },
    { key: "on_the_way", label: "On The Way" },
    { key: "arrived", label: "Arrived at Pickup" },
    { key: "completed", label: "Trip Completed" },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "confirmed":
        return 0;
      case "assigned":
        return 1;
      case "on_the_way":
        return 2;
      case "arrived":
      case "in_progress":
        return 3;
      case "completed":
        return 4;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(booking.status);
  const isCancelled = booking.status === "cancelled";

  return (
    <div className="w-full space-y-6">
      {/* Back link & breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/customer/bookings"
          className="text-xs text-zinc-400 hover:text-[#c8a05c] transition-colors flex items-center gap-1.5"
        >
          ← Back to All Bookings
        </Link>
        <span className="font-mono text-xs font-bold text-[#e8c683]">
          Ref: #{booking.bookingNumber}
        </span>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice("")}
            className="text-emerald-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Status Hero Card */}
      <div className="rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#c8a05c]">
              Live Ride Tracking
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              {isCancelled
                ? "This Booking is Cancelled"
                : booking.status === "on_the_way"
                ? "Your Chauffeur is En Route"
                : booking.status === "arrived"
                ? "Chauffeur Waiting at Pickup"
                : booking.status === "completed"
                ? "Trip Successfully Completed"
                : "Booking Confirmed & Ready"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Scheduled for:{" "}
              <span className="text-white font-medium">
                {new Date(booking.pickupTime).toLocaleString("en-AU", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </p>
          </div>

          {/* Quick status badge */}
          <div className="flex items-center gap-3">
            <Link
              href={`/customer/invoices/${booking.bookingNumber}`}
              className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-zinc-200 hover:bg-white/10 transition-colors"
            >
              🧾 Tax Invoice
            </Link>
            {!isCancelled && booking.status !== "completed" && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel Ride
              </button>
            )}
          </div>
        </div>

        {/* Milestone Progress Bar */}
        {!isCancelled && (
          <div className="py-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] -translate-y-1/2 transition-all duration-500"
                style={{
                  width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                }}
              />

              {/* Progress Nodes */}
              <div className="relative flex justify-between">
                {stages.map((stg, i) => {
                  const isDone = i <= currentStageIndex;
                  const isCurrent = i === currentStageIndex;
                  return (
                    <div key={stg.key} className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isDone
                            ? "bg-[#c8a05c] text-black shadow-lg shadow-[#c8a05c]/30"
                            : "bg-zinc-900 border border-zinc-700 text-zinc-500"
                        } ${isCurrent ? "ring-4 ring-[#c8a05c]/30 scale-110" : ""}`}
                      >
                        {isDone ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs mt-2 text-center hidden sm:block ${
                          isDone ? "text-white font-semibold" : "text-zinc-500"
                        }`}
                      >
                        {stg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Driver Details Card (When Assigned or On The Way) */}
        {booking.driverInfo ? (
          <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-[#c8a05c]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-[#c8a05c]/50 flex items-center justify-center text-lg text-[#e8c683]">
                🚘
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c8a05c]">
                  Assigned Chauffeur
                </span>
                <div className="text-base font-bold text-white">
                  {booking.driverInfo.driverName}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Vehicle: <span className="text-zinc-200">{booking.driverInfo.vehicleMakeModel}</span> •{" "}
                  Plate: <span className="font-mono text-[#e8c683]">{booking.driverInfo.licensePlate}</span>
                </div>
              </div>
            </div>

            {booking.driverInfo.driverPhone && (
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${booking.driverInfo.driverPhone}`}
                  className="px-4 py-2 rounded-xl bg-[#c8a05c] hover:bg-[#d6af70] text-black text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>📞</span>
                  <span>Call Chauffeur</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-xl bg-zinc-950/50 border border-white/5 text-xs text-zinc-400 flex items-center justify-between">
            <span>
              ℹ️ Dedicated chauffeur assignment will be confirmed 2-4 hours prior to pickup.
            </span>
            {!isCancelled && (
              <button
                type="button"
                onClick={() => setShowModifyModal(true)}
                className="text-[#c8a05c] hover:underline cursor-pointer"
              >
                Change Pickup Time / Notes
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trip Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Route */}
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
            Route Itinerary
          </h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#c8a05c] mt-1 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                  Pickup Location
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {typeof booking.pickup === "object" ? booking.pickup.address : booking.pickup}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">
                  Destination
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {typeof booking.dropoff === "object" ? booking.dropoff.address : booking.dropoff}
                </div>
              </div>
            </div>
          </div>

          {booking.flightNumber && (
            <div className="pt-3 border-t border-white/10 text-xs">
              <span className="text-zinc-400">Monitored Flight: </span>
              <span className="font-semibold text-white">{booking.flightNumber}</span>
              <div className="text-[10px] text-zinc-500 mt-0.5">
                Complimentary 60 mins wait time included from landed time.
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Passengers & Financials */}
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
            Reservation Breakdown
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Service Class:</span>
              <span className="text-white font-medium">{booking.vehicleType || "Chauffeur"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Passengers:</span>
              <span className="text-white font-medium">{booking.passengers} Adult(s)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Luggage Allowance:</span>
              <span className="text-white font-medium">{booking.luggage} Bag(s)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Payment Status:</span>
              <span className="capitalize text-[#e8c683] font-semibold">
                {booking.paymentStatus || "pending"}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-xs font-bold text-white">Total Fixed Fare:</span>
              <span className="text-lg font-bold font-serif text-[#e8c683]">
                ${booking.fare?.total || 0} {booking.fare?.currency || "AUD"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-red-500/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Cancel Booking #{booking.bookingNumber}?</h3>
            <p className="text-xs text-zinc-300">
              Free cancellation is supported up to 2 hours before scheduled pickup.
            </p>
            <div>
              <label htmlFor="cancel-reason" className="block text-xs text-zinc-400 mb-1">
                Reason for cancellation (Optional):
              </label>
              <textarea
                id="cancel-reason"
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Flight cancelled, meeting rescheduled"
                className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs outline-none focus:border-red-400"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleCancelBooking}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-[#c8a05c]/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Modify Ride Details</h3>
            <p className="text-xs text-zinc-300">
              Submit your adjustment request directly to our dispatch supervisor.
            </p>
            <div>
              <label htmlFor="modify-time" className="block text-xs text-zinc-400 mb-1">
                Requested New Pickup Time:
              </label>
              <input
                id="modify-time"
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="e.g. 11:30 AM"
                className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs outline-none focus:border-[#c8a05c]"
              />
            </div>
            <div>
              <label htmlFor="modify-notes" className="block text-xs text-zinc-400 mb-1">
                Special Instructions:
              </label>
              <textarea
                id="modify-notes"
                rows={3}
                value={modifyNote}
                onChange={(e) => setModifyNote(e.target.value)}
                placeholder="e.g. Extra child seat needed or change pickup point to Gate 3"
                className="w-full p-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs outline-none focus:border-[#c8a05c]"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModifyModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModifyBooking}
                className="px-4 py-2 rounded-xl bg-[#c8a05c] hover:bg-[#d6af70] text-xs font-bold text-black"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

