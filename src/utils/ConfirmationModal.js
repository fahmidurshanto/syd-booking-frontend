"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import StripePaymentForm from "@/components/StripePaymentForm";
import { getStripe } from "./stripe";

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
  const [clientSecret, setClientSecret] = useState(null);
  const [publishableKey, setPublishableKey] = useState(null);
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(true);

  // When booking is confirmed, initialize Stripe PaymentIntent
  useEffect(() => {
    if (!confirmedBooking) return;

    let isMounted = true;
    const initPayment = async () => {
      try {
        setIsInitializingPayment(true);
        setPaymentError("");

        const bookingId = confirmedBooking.id || confirmedBooking._id;
        const bookingNumber = confirmedBooking.bookingNumber;
        const fareTotal =
          confirmedBooking.fare?.total || calculatedFare?.total || 85;
        const fareCurrency =
          confirmedBooking.fare?.currency || calculatedFare?.currency || "AUD";

        const res = await fetch(`${API_BASE}/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            bookingNumber,
            amount: fareTotal,
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
  }, [confirmedBooking, calculatedFare]);

  if (!confirmedBooking) return null;

  const fareTotal = confirmedBooking.fare?.total || calculatedFare?.total || 85;
  const fareCurrency =
    confirmedBooking.fare?.currency || calculatedFare?.currency || "AUD";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg my-8 rounded-2xl bg-zinc-900 border border-[#c8a05c]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(200,160,92,0.3)] text-left flex flex-col space-y-5 confirmation-modal-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                paymentCompleted
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                  : "bg-[#c8a05c]/20 border border-[#c8a05c] text-[#c8a05c]"
              }`}
            >
              ✓
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                {paymentCompleted
                  ? "Booking & Payment Confirmed!"
                  : "Booking Received!"}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#c8a05c] font-mono font-semibold">
                  Ref: {confirmedBooking.bookingNumber || "CONFIRMED"}
                </span>
                {paymentCompleted && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Paid
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Booking Summary */}
        <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Service:</span>
            <span className="font-bold text-white uppercase">
              {confirmedBooking.vehicleType ||
                (isChauffeur ? "Chauffeur" : "Taxi")}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Pickup:</span>
            <span className="font-medium text-right text-white max-w-[240px] truncate">
              {confirmedBooking.pickup}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Destination:</span>
            <span className="font-medium text-right text-white max-w-[240px] truncate">
              {confirmedBooking.dropoff}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Date &amp; Time:</span>
            <span className="text-white">
              {pickupDate} at {pickupTime}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Passengers / Luggage:</span>
            <span className="text-white">
              {passengers} Passengers • {luggage} Bags
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">Passenger Contact:</span>
            <span className="text-white text-right">
              {passengerName} ({passengerPhone})
            </span>
          </div>
          <div className="flex justify-between py-2 bg-white/5 px-3 rounded-lg text-sm sm:text-base font-bold">
            <span className="text-[#c8a05c]">Guaranteed Fare:</span>
            <span className="text-white font-mono">
              ${fareTotal} {fareCurrency}
            </span>
          </div>
        </div>

        {/* Embedded Stripe Elements Section */}
        {!paymentCompleted && showPaymentSection && (
          <div className="p-4 rounded-xl bg-black/40 border border-[#c8a05c]/30 space-y-3 stripe-card-container">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
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
                Secure Card / Digital Wallet Payment
              </span>
              <span className="text-[10px] text-zinc-400">
                Powered by Stripe
              </span>
            </div>

            {isInitializingPayment ? (
              <div className="py-6 flex flex-col items-center justify-center space-y-2 text-zinc-400 text-xs">
                <svg
                  className="animate-spin h-5 w-5 text-[#c8a05c]"
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
                <span>Loading secure payment gateway...</span>
              </div>
            ) : clientSecret && stripePromise ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance,
                }}
              >
                <StripePaymentForm
                  booking={confirmedBooking}
                  amount={fareTotal}
                  currency={fareCurrency}
                  onPaymentSuccess={() => {
                    setPaymentCompleted(true);
                  }}
                  onCancel={() => {
                    setShowPaymentSection(false);
                  }}
                />
              </Elements>
            ) : (
              <div className="py-3 text-center space-y-2">
                <p className="text-xs text-amber-300">
                  {paymentError ||
                    "Payment setup unavailable. You may pay directly in the vehicle."}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPaymentSection(false)}
                  className="text-xs text-zinc-400 underline hover:text-white cursor-pointer"
                >
                  Continue with Cash / In-car payment
                </button>
              </div>
            )}
          </div>
        )}

        {/* Payment Completed Status Banner */}
        {paymentCompleted && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-1">
            <p className="text-xs sm:text-sm font-bold text-emerald-400">
              Payment Successful!
            </p>
            <p className="text-xs text-emerald-200/80">
              Transaction has been authorized. A receipt has been emailed to{" "}
              <span className="font-semibold text-white">
                {confirmedBooking.passengerEmail || passengerEmail}
              </span>
              .
            </p>
          </div>
        )}

        {/* Footer Notes */}
        {!paymentCompleted && !showPaymentSection && (
          <div className="p-3 rounded-lg bg-zinc-800/80 border border-white/10 text-xs text-zinc-300 text-center">
            Payment Method:{" "}
            <span className="font-semibold text-white">
              Cash or EFTPOS in vehicle
            </span>
          </div>
        )}

        <p className="text-xs text-zinc-400 text-center">
          Confirmation details sent to{" "}
          <span className="text-white font-medium">
            {confirmedBooking.passengerEmail || passengerEmail}
          </span>
          . Free cancellation up to 2 hours before pickup.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer text-center"
        >
          {paymentCompleted
            ? "Done / Book Another Ride"
            : "Close / Book Another"}
        </button>
      </div>
    </div>
  );
}
