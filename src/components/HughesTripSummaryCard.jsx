"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled for Leaflet map component
const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[180px] bg-slate-100 flex items-center justify-center text-xs text-slate-400">
      Loading interactive map...
    </div>
  ),
});

export default function HughesTripSummaryCard({
  pickup,
  dropoff,
  pickupCoords,
  dropoffCoords,
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
      {/* Live Interactive Leaflet Map Header */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
        <RouteMap
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
          pickupName={pickup}
          dropoffName={dropoff}
        />

        {/* Floating Category Tag */}
        <div className="absolute top-3 left-3 z-[400] pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 backdrop-blur-xs text-white shadow-md">
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
                {pickup || (
                  <span className="text-slate-400 font-normal italic">
                    Please select pick-up...
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-3.5 h-3.5 rounded-xs bg-emerald-600 mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Destination
              </span>
              <p className="text-sm font-semibold text-slate-900 break-words mt-0.5">
                {dropoff || (
                  <span className="text-slate-400 font-normal italic">
                    Please select destination...
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule & Pax Strip */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">
              Pickup Time
            </span>
            <span className="font-semibold text-slate-900 mt-0.5 block truncate">
              {pickupDate || "Today"} • {pickupTime}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">
              Party Size
            </span>
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

        {/* Live Fare Total Box (Only shows real fare from calculation) */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              Guaranteed Upfront Fare
            </span>
            <span className="text-xs text-emerald-700 font-medium">
              Zero surge pricing
            </span>
          </div>

          <div className="text-right">
            {isCalculatingFare ? (
              <span className="text-xs text-slate-500 animate-pulse font-medium">
                Calculating trip fare...
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
