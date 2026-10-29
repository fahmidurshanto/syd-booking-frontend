"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripePaymentForm({
  booking,
  amount,
  currency = "AUD",
  onPaymentSuccess,
  onCancel,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(
          error.message || "Payment failed. Please verify your card details.",
        );
        setIsProcessing(false);
        return;
      }

      if (
        paymentIntent &&
        (paymentIntent.status === "succeeded" ||
          paymentIntent.status === "processing")
      ) {
        // Notify backend to confirm the booking status
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        try {
          await fetch(`${API_BASE}/payments/confirm`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              bookingId: booking?.id || booking?._id,
              bookingNumber: booking?.bookingNumber,
            }),
          });
        } catch (confirmErr) {
          console.warn(
            "Backend confirm call notification warning:",
            confirmErr,
          );
        }

        onPaymentSuccess(paymentIntent);
      } else {
        setErrorMessage("Payment status pending or incomplete. Please check.");
      }
    } catch (err) {
      setErrorMessage(
        err.message ||
          "An unexpected error occurred during payment processing.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {errorMessage && (
        <div className="p-2.5 text-xs rounded-xl bg-red-500/15 border border-red-500/40 text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="p-2.5 sm:p-3 rounded-xl bg-black/30 border border-white/10 stripe-payment-element-box">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      <div className="flex items-center gap-2.5 pt-1">
        {onCancel && (
          <button
            type="button"
            disabled={isProcessing}
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/40 transition-all cursor-pointer disabled:opacity-50"
          >
            Pay Later / Cash
          </button>
        )}
        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-black"
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
              <span>Processing...</span>
            </>
          ) : (
            <span>
              Pay ${amount} {currency}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
