"use client";

export default function PassengerDetailsForm({
  passengers,
  setPassengers,
  luggage,
  setLuggage,
  flightNumber,
  setFlightNumber,
  passengerName,
  setPassengerName,
  passengerPhone,
  setPassengerPhone,
  passengerEmail,
  setPassengerEmail,
  isChauffeur,
}) {
  return (
    <>
      {/* Passenger & Luggage Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="passengers-select"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
          >
            Passengers
          </label>
          <select
            id="passengers-select"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num} className="bg-zinc-900">
                {num} {num === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="luggage-select"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
          >
            Luggage Pieces
          </label>
          <select
            id="luggage-select"
            value={luggage}
            onChange={(e) => setLuggage(Number(e.target.value))}
            className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all cursor-pointer"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num} className="bg-zinc-900">
                {num} {num === 1 ? "Bag" : "Bags"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="flight-input"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
          >
            Flight # (Optional)
          </label>
          <input
            id="flight-input"
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g. QF1, VA805"
            className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white placeholder-zinc-500 text-sm outline-none transition-all uppercase"
          />
        </div>
      </div>

      {/* Passenger Contact Information */}
      <div className="pt-2 border-t border-white/10 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
          Passenger Contact Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name-input"
              className="block text-xs font-medium text-zinc-300 mb-1"
            >
              Full Name <span className="text-[#c8a05c]">*</span>
            </label>
            <input
              id="name-input"
              type="text"
              required
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="phone-input"
              className="block text-xs font-medium text-zinc-300 mb-1"
            >
              Mobile Phone <span className="text-[#c8a05c]">*</span>
            </label>
            <input
              id="phone-input"
              type="tel"
              required
              value={passengerPhone}
              onChange={(e) => setPassengerPhone(e.target.value)}
              placeholder="e.g. +61 412 345 678"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email-input"
            className="block text-xs font-medium text-zinc-300 mb-1"
          >
            Email Address (For Confirmation Receipt){" "}
            <span className={isChauffeur ? "text-[#c8a05c]" : "text-amber-400"}>
              *
            </span>
          </label>
          <input
            id="email-input"
            type="email"
            required
            value={passengerEmail}
            onChange={(e) => setPassengerEmail(e.target.value)}
            placeholder="e.g. john.doe@example.com"
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
          />
        </div>
      </div>
    </>
  );
}
