"use client";

export default function DropoffLocationInput({
  dropoff,
  dropoffInputRef,
  dropoffContainerRef,
  pickup,
  isLoadingDropoff,
  showDropoffDropdown,
  dropoffSuggestions,
  onDropoffChange,
  onSelectDropoff,
  onClearDropoff,
  onFocus,
}) {
  return (
    <div ref={dropoffContainerRef} className="relative">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="dropoff-input"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          Step 2: Drop-off Destination <span className="text-[#c8a05c]">*</span>
          {pickup && (
            <span className="ml-2 text-[10px] text-emerald-400 font-normal lowercase">
              (connected to {pickup})
            </span>
          )}
        </label>
        {dropoff && (
          <button
            type="button"
            onClick={onClearDropoff}
            className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Change Destination
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <input
          ref={dropoffInputRef}
          id="dropoff-input"
          type="text"
          required
          disabled={!pickup.trim()}
          value={dropoff}
          onFocus={onFocus}
          onClick={onFocus}
          onChange={(e) => onDropoffChange(e.target.value)}
          placeholder={
            pickup.trim()
              ? `Choose destination connected to ${pickup}...`
              : "🔒 Select Pickup location first..."
          }
          className={`w-full pl-11 pr-10 py-3.5 rounded-xl border text-sm outline-none transition-all ${
            !pickup.trim()
              ? "bg-zinc-950/40 border-white/5 text-zinc-500 cursor-not-allowed"
              : "bg-black/60 border-white/15 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white placeholder-zinc-500"
          }`}
        />
        {isLoadingDropoff ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dropoff ? (
          <button
            type="button"
            onClick={onClearDropoff}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* Dropoff Dropdown Suggestions: connected destinations */}
      {showDropoffDropdown && pickup.trim() && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-zinc-950 border border-emerald-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1 divide-y divide-white/5">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/40 flex items-center justify-between">
            <span>Destinations connected to: {pickup}</span>
            <span>
              {dropoffSuggestions.length}{" "}
              {dropoffSuggestions.length === 1 ? "route" : "routes"}
            </span>
          </div>

          {dropoffSuggestions.length > 0 ? (
            dropoffSuggestions.map((place) => {
              const placeObj =
                typeof place === "string" ? { name: place } : place;
              const isSelected = dropoff === placeObj.name;
              return (
                <button
                  key={placeObj.name}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectDropoff(placeObj);
                  }}
                  onClick={() => onSelectDropoff(placeObj)}
                  className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-emerald-950/50 text-emerald-300"
                      : "hover:bg-zinc-800/80 text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 text-base">🏁</span>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-emerald-300 transition-colors">
                        {placeObj.name}
                      </p>
                      {placeObj.address && (
                        <p className="text-xs text-zinc-400">
                          {placeObj.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                    Select →
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-4 text-xs text-zinc-400 text-center">
              {isLoadingDropoff
                ? "Loading connected routes..."
                : "No connected direct routes found for this pickup location."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
