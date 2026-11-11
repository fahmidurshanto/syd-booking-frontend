"use client";

export default function HughesTripSummaryCard({
  pickup,
  dropoff,
  pickupDate,
  pickupTime,
  passengers,
  luggage,
  calculatedFare,
  isCalculatingFare,
  isChauffeur,
}) {
  const hasFare = calculatedFare && typeof calculatedFare.total === "number";
  const fareTotal = hasFare ? calculatedFare.total : null;
  const fareCurrency = calculatedFare?.currency || "AUD";

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-lg overflow-hidden flex flex-col text-slate-900">
      {/* Visual Map / Route Preview Header */}
      <div className="relative h-44 sm:h-48 w-full bg-[#f1f5f9] overflow-hidden border-b border-slate-200">
        {/* Subtle Map Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

        {/* SVG Illustrated Path between Pickup & Dropoff */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="routeGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path
            d="M 50 120 C 130 50, 200 130, 310 60"
            fill="none"
            stroke="url(#routeGradientLight)"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* Start Station Pin */}
        <div className="absolute left-6 bottom-6 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-300 text-xs shadow-md">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-900 bg-white" />
          <span className="text-slate-900 font-semibold truncate max-w-[140px]">
            {pickup || "Select Pick-up"}
          </span>
        </div>

        {/* Destination Station Pin */}
        <div className="absolute right-6 top-6 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg border border-emerald-500/60 text-xs shadow-md">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
          <span className="text-slate-900 font-semibold truncate max-w-[140px]">
            {dropoff || "Select Destination"}
          </span>
        </div>

        {/* Live Fare pill in map corner */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
            {isChauffeur ? "Chauffeur Service" : "Taxi Service"}
          </span>
        </div>
      </div>

      {/* Route Journey Summary Details */}
      <div className="p-5 sm:p-6 space-y-4 flex-1">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 bg-white mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Pick-up Location
              </span>
              <p className="text-sm font-semibold text-slate-900 break-words mt-0.5">
                {pickup || <span className="text-slate-400 font-normal italic">Please select pick-up...</span>}
              </p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-slate-300 ml-1.5 pl-4 py-0.5" />

          <div className="flex items-start gap-3">
            <div className="w-3.5 h-3.5 rounded-xs bg-emerald-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Destination
              </span>
              <p className="text-sm font-semibold text-slate-900 break-words mt-0.5">
                {dropoff || <span className="text-slate-400 font-normal italic">Please select destination...</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule & Pax Strip */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Pickup Time</span>
            <span className="font-semibold text-slate-900 mt-0.5 block truncate">
              {pickupDate || "Today"} • {pickupTime}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Party Size</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">
              {passengers} Pax • {luggage} Bags
            </span>
          </div>
        </div>

        {/* Value Guarantees list (Hughes style badges) */}
        <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-600 text-sm">🏷️</span>
            <span>Fixed price, all Sydney tolls &amp; GST included</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-blue-600 text-sm">🗓️</span>
            <span>Free cancellation up to 2 hours before pick-up</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-amber-600 text-sm">🔒</span>
            <span>Secure payment &amp; terminal meet &amp; greet</span>
          </div>
        </div>

        {/* Live Fare Total Box (Only shows real fare from database) */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              Guaranteed Upfront Fare
            </span>
            <span className="text-xs text-emerald-700 font-medium">Zero surge pricing</span>
          </div>

          <div className="text-right">
            {isCalculatingFare ? (
              <span className="text-xs text-slate-500 animate-pulse font-medium">
                Fetching exact route fare...
              </span>
            ) : hasFare ? (
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
                ${fareTotal}{" "}
                <span className="text-xs font-sans text-slate-500 font-normal">
                  {fareCurrency}
                </span>
              </span>
            ) : (
              <span className="text-xs text-slate-400 italic">
                Select both locations for fare
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
