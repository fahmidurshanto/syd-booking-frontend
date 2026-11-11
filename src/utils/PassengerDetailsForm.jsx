"use client";

export default function PassengerDetailsForm({
  passengers,
  setPassengers,
  luggage,
  setLuggage,
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
      {/* Luggage Pieces Selector */}
      <div className="pt-2 border-t border-slate-100">
        <div>
          <label
            htmlFor="luggage-select"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Luggage / Suitcases
          </label>
          <select
            id="luggage-select"
            value={luggage}
            onChange={(e) => setLuggage(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium outline-none transition-all cursor-pointer focus:border-slate-900 focus:bg-white"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num} className="bg-white text-slate-900">
                {num} {num === 1 ? "Suitcase" : "Suitcases"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Passenger Contact Information */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
          <span>👤</span> Passenger Contact Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="name-input"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Full Name <span className="text-amber-600">*</span>
            </label>
            <input
              id="name-input"
              type="text"
              required
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none transition-all focus:border-slate-900 focus:bg-white placeholder-slate-400"
            />
          </div>
          <div>
            <label
              htmlFor="phone-input"
              className="block text-xs font-medium text-slate-700 mb-1"
            >
              Mobile Phone <span className="text-amber-600">*</span>
            </label>
            <input
              id="phone-input"
              type="tel"
              required
              value={passengerPhone}
              onChange={(e) => setPassengerPhone(e.target.value)}
              placeholder="e.g. +61 412 345 678"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none transition-all focus:border-slate-900 focus:bg-white placeholder-slate-400"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email-input"
            className="block text-xs font-medium text-slate-700 mb-1"
          >
            Email Address (For Confirmation &amp; Tax Receipt){" "}
            <span className="text-amber-600">*</span>
          </label>
          <input
            id="email-input"
            type="email"
            required
            value={passengerEmail}
            onChange={(e) => setPassengerEmail(e.target.value)}
            placeholder="e.g. john.doe@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none transition-all focus:border-slate-900 focus:bg-white placeholder-slate-400"
          />
        </div>
      </div>
    </>
  );
}
