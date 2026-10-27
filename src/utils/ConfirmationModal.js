"use client";

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
  if (!confirmedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-[#c8a05c]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(200,160,92,0.3)] text-left flex flex-col space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c8a05c]/20 border border-[#c8a05c] flex items-center justify-center text-[#c8a05c]">
              ✓
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Booking Confirmed!
              </h3>
              <span className="text-xs text-[#c8a05c] font-mono font-semibold">
                Ref: {confirmedBooking.bookingNumber || "CONFIRMED"}
              </span>
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

        <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
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
              {passengerName} ({passengerPhone})<br />
              <span className="text-xs text-zinc-400">
                {confirmedBooking.passengerEmail || passengerEmail}
              </span>
            </span>
          </div>
          <div className="flex justify-between py-2 bg-white/5 px-3 rounded-lg text-sm sm:text-base font-bold">
            <span className="text-[#c8a05c]">Guaranteed Fare:</span>
            <span className="text-white font-mono">
              ${confirmedBooking.fare?.total || calculatedFare?.total || 85}{" "}
              {confirmedBooking.fare?.currency || "AUD"}
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center">
          A confirmation receipt and booking details have been sent to{" "}
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
          Done / Book Another Ride
        </button>
      </div>
    </div>
  );
}
