"use client";

export default function PickupLocationInput({
  pickup,
  pickupInputRef,
  pickupContainerRef,
  isLoadingPickup,
  pickupNotice,
  showPickupDropdown,
  pickupSuggestions,
  onPickupChange,
  onSelectPickup,
  onClearPickup,
  onFocus,
}) {
  return (
    <div ref={pickupContainerRef} className="relative">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="pickup-input"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          Step 1: Pickup Location <span className="text-[#c8a05c]">*</span>
        </label>
        {pickup && (
          <button
            type="button"
            onClick={onClearPickup}
            className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Change Pickup
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c8a05c]">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <input
          ref={pickupInputRef}
          id="pickup-input"
          type="text"
          required
          value={pickup}
          onFocus={onFocus}
          onChange={(e) => onPickupChange(e.target.value)}
          placeholder="Type or select pickup location (e.g. Sydney Airport, Sydney CBD)..."
          className={`w-full pl-11 pr-10 py-3.5 rounded-xl bg-black/60 border text-white placeholder-zinc-500 text-sm outline-none transition-all ${
            pickupNotice
              ? "border-[#c8a05c] ring-2 ring-[#c8a05c]/50"
              : "border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c]"
          }`}
        />
        {isLoadingPickup ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="w-4 h-4 border-2 border-[#c8a05c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : pickup ? (
          <button
            type="button"
            onClick={onClearPickup}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        ) : null}
      </div>

      {pickupNotice && (
        <p className="mt-1 text-xs text-[#c8a05c] font-medium flex items-center gap-1">
          <span>⚠️</span> {pickupNotice}
        </p>
      )}

      {/* Pickup Dropdown Suggestions */}
      {showPickupDropdown && pickupSuggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-zinc-950 border border-[#c8a05c]/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1 divide-y divide-white/5">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-zinc-400 bg-white/5">
            Select Origin Location
          </div>
          {pickupSuggestions.map((place) => {
            const placeObj =
              typeof place === "string" ? { name: place } : place;
            const isSelected = pickup === placeObj.name;
            return (
              <button
                key={placeObj.name}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectPickup(placeObj);
                }}
                onClick={() => onSelectPickup(placeObj)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-[#c8a05c]/20 text-[#e8c683]"
                    : "hover:bg-zinc-800/80 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#c8a05c] text-base">📍</span>
                  <div>
                    <p className="text-sm font-semibold group-hover:text-[#e8c683] transition-colors">
                      {placeObj.name}
                    </p>
                    {placeObj.address && (
                      <p className="text-xs text-zinc-400">
                        {placeObj.address}
                      </p>
                    )}
                  </div>
                </div>
                {placeObj.code && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                    {placeObj.code}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
