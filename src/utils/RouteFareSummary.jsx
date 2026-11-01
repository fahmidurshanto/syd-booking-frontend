"use client";

export default function RouteFareSummary({
  isCalculatingFare,
  calculatedFare,
  pickup,
  dropoff,
  isChauffeur,
}) {
  if (isCalculatingFare) {
    return (
      <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/10 flex items-center justify-center gap-3 text-xs text-zinc-400 animate-pulse">
        <span className="w-3.5 h-3.5 border-2 border-[#c8a05c] border-t-transparent rounded-full animate-spin" />
        <span>Calculating live route fare from Sydney Transport API...</span>
      </div>
    );
  }

  if (!calculatedFare) return null;

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-zinc-950 via-[#181a20] to-zinc-950 border border-[#c8a05c]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#c8a05c] text-black">
            Guaranteed Route Fare
          </span>
          <span className="text-xs text-zinc-400">
            Zero Surge • All Inclusive
          </span>
        </div>
        <p className="text-xs text-zinc-300 mt-1.5">
          Route: <span className="text-white font-medium">{pickup}</span> →{" "}
          <span className="text-white font-medium">{dropoff}</span>
        </p>
        {(calculatedFare.distanceKm || calculatedFare.durationMin) && (
          <p className="text-xs text-zinc-400 mt-0.5">
            Est. {calculatedFare.distanceKm} km • ~{calculatedFare.durationMin}{" "}
            mins duration
          </p>
        )}
      </div>
      <div className="text-right sm:self-center">
        <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
          {isChauffeur ? "Chauffeur Fare" : "Taxi Fare"}
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#e8c683]">
          ${calculatedFare.total}{" "}
          <span className="text-xs font-sans text-zinc-400 font-normal">
            {calculatedFare.currency}
          </span>
        </span>
      </div>
    </div>
  );
}
