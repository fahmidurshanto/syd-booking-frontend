"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import StripePaymentForm from "@/components/StripePaymentForm";
import { getStripe } from "./stripe";
import { calculateStripeSurcharge, STRIPE_RATES } from "./stripeFee";
import { saveCustomerBooking } from "./customerAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ConfirmationModal({
  confirmedBooking,
  isChauffeur,
  calculatedFare,
  pickupDate,
  pickupTime,
  passengers,
  luggage,
  passengerName,
  passengerPhone,
  passengerEmail,
  onClose,
  onReset,
}) {
  const [currentBooking, setCurrentBooking] = useState(confirmedBooking);
  const [clientSecret, setClientSecret] = useState(null);
  const [publishableKey, setPublishableKey] = useState(null);
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(true);

  useEffect(() => {
    setCurrentBooking(confirmedBooking);
  }, [confirmedBooking]);

  // Card region state: 'domestic' (1.65% + $0.30) vs 'international' (3.5% + $0.30)
  const [cardType, setCardType] = useState("domestic");

  const baseFare = confirmedBooking?.fare?.total || calculatedFare?.total || 0;
  const fareCurrency =
    confirmedBooking?.fare?.currency || calculatedFare?.currency || "AUD";

  const feeCalc = calculateStripeSurcharge(baseFare, cardType);

  // Re-initialize payment intent whenever baseFare or cardType changes
  useEffect(() => {
    if (!confirmedBooking) return;

    let isMounted = true;
    const initPayment = async () => {
      try {
        setIsInitializingPayment(true);
        setPaymentError("");

        const bookingId = confirmedBooking.id || confirmedBooking._id;
        const bookingNumber = confirmedBooking.bookingNumber;
        const totalWithSurcharge = feeCalc.total;

        const res = await fetch(`${API_BASE}/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            bookingNumber,
            amount: totalWithSurcharge,
            baseFare: feeCalc.baseFare,
            surcharge: feeCalc.surcharge,
            cardType: feeCalc.cardType,
            currency: fareCurrency,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setClientSecret(data.clientSecret);
            setPublishableKey(data.publishableKey);
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          if (isMounted) {
            setPaymentError(
              errData.message || "Failed to initialize payment method.",
            );
          }
        }
      } catch (err) {
        if (isMounted) {
          setPaymentError("Unable to connect to payment services.");
        }
      } finally {
        if (isMounted) setIsInitializingPayment(false);
      }
    };

    initPayment();

    return () => {
      isMounted = false;
    };
  }, [confirmedBooking, cardType, baseFare]);

  if (!confirmedBooking) return null;

  const stripePromise = getStripe(publishableKey);

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#c8a05c",
      colorBackground: "#18181b",
      colorText: "#ffffff",
      colorDanger: "#f87171",
      fontFamily: "inherit",
      spacingUnit: "4px",
      borderRadius: "10px",
    },
    rules: {
      ".Tab": {
        border: "1px solid rgba(255, 255, 255, 0.15)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
      ".Tab:hover": {
        borderColor: "#c8a05c",
      },
      ".Tab--selected": {
        borderColor: "#c8a05c",
        backgroundColor: "rgba(200, 160, 92, 0.15)",
      },
      ".Input": {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
      ".Input:focus": {
        borderColor: "#c8a05c",
        boxShadow: "0 0 0 1px #c8a05c",
      },
    },
  };

  const handlePaymentDone = (paymentIntent) => {
    setPaymentCompleted(true);
    // Update booking in local storage with paid surcharge breakdown and paymentMethod: online
    const updated = {
      ...(currentBooking || confirmedBooking),
      status: "confirmed",
      paymentStatus: "paid",
      paymentMethod: "online",
      fare: {
        total: feeCalc.total,
        baseFare: feeCalc.baseFare,
        surcharge: feeCalc.surcharge,
        currency: fareCurrency,
        cardType: feeCalc.cardType,
      },
      paymentDetails: {
        ...(currentBooking?.paymentDetails || confirmedBooking?.paymentDetails || {}),
        paymentIntentId: paymentIntent?.id || "pi_mock",
        paymentMethod: "online",
        paidAmount: feeCalc.total,
        paidCurrency: fareCurrency,
        paidAt: new Date().toISOString(),
      },
    };
    setCurrentBooking(updated);
    saveCustomerBooking(updated);
  };

  const handleCashSelected = async () => {
    setShowPaymentSection(false);
    const updated = {
      ...(currentBooking || confirmedBooking),
      paymentMethod: "cash",
      paymentStatus: "cash_to_driver",
      paymentDetails: {
        ...(currentBooking?.paymentDetails || confirmedBooking?.paymentDetails || {}),
        paymentMethod: "cash",
      },
    };
    setCurrentBooking(updated);
    saveCustomerBooking(updated);

    const refOrId =
      currentBooking?.bookingNumber ||
      confirmedBooking?.bookingNumber ||
      currentBooking?.id ||
      confirmedBooking?.id ||
      currentBooking?._id ||
      confirmedBooking?._id;

    if (refOrId) {
      try {
        await fetch(`${API_BASE}/bookings/${refOrId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod: "cash",
            paymentStatus: "cash_to_driver",
          }),
        });
      } catch (err) {
        console.warn("Failed to update booking to cash payment:", err);
      }
    }
  };

  const handleSwitchToOnline = async () => {
    setShowPaymentSection(true);
    const updated = {
      ...(currentBooking || confirmedBooking),
      paymentMethod: "online",
      paymentStatus: "pending",
    };
    setCurrentBooking(updated);
    saveCustomerBooking(updated);

    const refOrId =
      currentBooking?.bookingNumber ||
      confirmedBooking?.bookingNumber ||
      currentBooking?.id ||
      confirmedBooking?.id ||
      currentBooking?._id ||
      confirmedBooking?._id;

    if (refOrId) {
      try {
        await fetch(`${API_BASE}/bookings/${refOrId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethod: "online",
            paymentStatus: "pending",
          }),
        });
      } catch (err) {
        console.warn("Failed to reset booking payment method to online:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl lg:max-w-5xl my-auto rounded-2xl bg-zinc-900 border border-[#c8a05c]/50 shadow-[0_0_50px_rgba(200,160,92,0.25)] flex flex-col max-h-[92vh] overflow-hidden confirmation-modal-card">
        {/* Header (Sticky top) */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 shrink-0 bg-zinc-900/95">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                paymentCompleted
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                  : "bg-[#c8a05c]/20 border border-[#c8a05c] text-[#c8a05c]"
              }`}
            >
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {paymentCompleted
                    ? "Booking & Payment Confirmed!"
                    : "Booking Received!"}
                </h3>
                {paymentCompleted && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Paid
                  </span>
                )}
              </div>
              <p className="text-xs text-[#c8a05c] font-mono font-semibold">
                Ref: {confirmedBooking.bookingNumber || "CONFIRMED"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-zinc-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-start">

            {/* LEFT COLUMN: Passenger & Trip Details */}
            <div className="md:col-span-6 flex flex-col space-y-3.5 bg-black/30 p-4 sm:p-5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c8a05c] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c8a05c]"></span>
                  Booking &amp; Trip Summary
                </span>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-white">
                  {confirmedBooking.vehicleType || (isChauffeur ? "Chauffeur" : "Taxi")}
                </span>
              </div>

              {/* Route Itinerary */}
              <div className="space-y-2 bg-white/5 p-3 rounded-lg border border-white/5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Pickup</p>
                    <p className="text-white font-medium break-words">
                      {typeof confirmedBooking.pickup === "object" ? confirmedBooking.pickup.address : confirmedBooking.pickup}
                    </p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-white/20 ml-1 pl-3 py-1"></div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#c8a05c] mt-1 shrink-0"></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-zinc-400">Destination</p>
                    <p className="text-white font-medium break-words">
                      {typeof confirmedBooking.dropoff === "object" ? confirmedBooking.dropoff.address : confirmedBooking.dropoff}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trip Metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Date &amp; Time</span>
                  <span className="font-semibold text-white">
                    {pickupDate} • {pickupTime}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-0.5">Passengers / Bags</span>
                  <span className="font-semibold text-white">
                    {passengers} Pax • {luggage} Bags
                  </span>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Passenger Details</span>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Name:</span>
                  <span className="font-medium text-white">{passengerName || confirmedBooking.passengerName || "Guest"}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Phone:</span>
                  <span className="font-medium text-white">{passengerPhone || confirmedBooking.passengerPhone}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Email:</span>
                  <span className="font-medium text-white truncate max-w-[180px]">{passengerEmail || confirmedBooking.passengerEmail}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-400">Payment:</span>
                  <span className="font-semibold text-[#e8c683]">
                    {paymentCompleted
                      ? "Online Card (Paid)"
                      : !showPaymentSection || currentBooking?.paymentMethod === "cash"
                      ? "Cash to Driver"
                      : "Online Card (Pending)"}
                  </span>
                </div>
              </div>

              {/* Base Fare Summary */}
              <div className="flex items-center justify-between py-2.5 px-3.5 bg-black/40 border border-white/10 rounded-lg text-xs sm:text-sm">
                <div>
                  <span className="text-zinc-400 block">Base Transfer Fare:</span>
                  <span className="text-[10px] text-zinc-500">Tolls &amp; GST included</span>
                </div>
                <span className="text-white font-mono font-bold text-sm sm:text-base">
                  ${baseFare} {fareCurrency}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                Confirmation sent to <span className="text-white font-medium">{confirmedBooking.passengerEmail || passengerEmail}</span>. Free cancellation up to 2 hours before pickup.
              </p>
            </div>

            {/* RIGHT COLUMN: Real Stripe Card Surcharge & Payment Form */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-3.5 bg-black/40 p-4 sm:p-5 rounded-xl border border-[#c8a05c]/35 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold tracking-wide uppercase text-[#c8a05c] flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-[#c8a05c]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Card Payment &amp; Surcharge
                </span>
                <span className="text-[10px] text-zinc-400">
                  Official Stripe Rates
                </span>
              </div>

              {/* Payment Completed Status */}
              {paymentCompleted ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Payment Successful!</h4>
                    <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                      Your payment of <span className="text-white font-bold">${feeCalc.total.toFixed(2)} {fareCurrency}</span> (Base ${baseFare} + ${feeCalc.surcharge.toFixed(2)} card processing fee) has been processed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onReset}
                    className="mt-2 w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer text-center"
                  >
                    Done / Book Another Ride
                  </button>
                </div>
              ) : !showPaymentSection ? (
                /* Pay Later / In-car Payment Option Selected */
                <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl">
                    💵
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Payment Method: Cash
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-2">
                      Pay Cash in Vehicle (Zero Surcharge)
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1 max-w-xs">
                      You can pay exactly <span className="text-white font-semibold">${baseFare} {fareCurrency}</span> via Cash directly to the driver upon ride completion without online card surcharge.
                    </p>
                  </div>
                  <div className="w-full space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={handleSwitchToOnline}
                      className="w-full py-2.5 rounded-xl border border-[#c8a05c]/60 text-xs font-semibold text-[#c8a05c] hover:bg-[#c8a05c]/10 transition-all cursor-pointer"
                    >
                      Pay Online with Card Instead
                    </button>
                    <button
                      type="button"
                      onClick={onReset}
                      className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer text-center"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Stripe Payment Form with Real Surcharge Selector */
                <div className="space-y-3.5">
                  {/* Card Type Selector (Domestic 1.65%+$0.30 vs International 3.5%+$0.30) */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-zinc-300">
                      Card Issuing Region (Stripe Surcharge):
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setCardType("domestic")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          cardType === "domestic"
                            ? "border-[#c8a05c] bg-[#c8a05c]/15 text-white font-semibold shadow-sm"
                            : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">🇦🇺 Australian Card</span>
                          {cardType === "domestic" && <span className="text-[#c8a05c]">●</span>}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          1.65% + $0.30
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCardType("international")}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          cardType === "international"
                            ? "border-[#c8a05c] bg-[#c8a05c]/15 text-white font-semibold shadow-sm"
                            : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">🌏 International Card</span>
                          {cardType === "international" && <span className="text-[#c8a05c]">●</span>}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          3.50% + $0.30
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Surcharge Line Item Breakdown */}
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 text-xs space-y-1.5">
                    <div className="flex justify-between text-zinc-400">
                      <span>Ride Base Fare:</span>
                      <span className="font-medium text-white">${baseFare.toFixed(2)} AUD</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Stripe Card Fee ({feeCalc.rateLabel}):</span>
                      <span className="font-semibold text-amber-300">
                        +${feeCalc.surcharge.toFixed(2)} AUD
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white">
                      <span>Total Charged to Card:</span>
                      <span className="text-base font-serif text-[#e8c683]">
                        ${feeCalc.total.toFixed(2)} AUD
                      </span>
                    </div>
                  </div>

                  {/* Stripe Payment Form Container */}
                  <div className="stripe-card-container">
                    {isInitializingPayment ? (
                      <div className="py-8 flex flex-col items-center justify-center space-y-2 text-zinc-400 text-xs">
                        <svg
                          className="animate-spin h-6 w-6 text-[#c8a05c]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Updating secure payment intent...</span>
                      </div>
                    ) : clientSecret && stripePromise ? (
                      <div className="space-y-3">
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret,
                            appearance,
                          }}
                        >
                          <StripePaymentForm
                            booking={currentBooking || confirmedBooking}
                            amount={feeCalc.total.toFixed(2)}
                            currency={fareCurrency}
                            onPaymentSuccess={handlePaymentDone}
                            onCancel={handleCashSelected}
                          />
                        </Elements>
                      </div>
                    ) : (
                      <div className="py-5 text-center space-y-2.5">
                        <p className="text-xs text-amber-300">
                          {paymentError ||
                            "Online card processing unavailable. You may pay directly in the vehicle."}
                        </p>
                        <button
                          type="button"
                          onClick={handleCashSelected}
                          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white cursor-pointer transition-all"
                        >
                          Continue with In-Car Payment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Subtle Close Link */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={onReset}
                  className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Close &amp; return to homepage
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
