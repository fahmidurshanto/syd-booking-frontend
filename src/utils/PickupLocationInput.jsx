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
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="pickup-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Pick-up Location <span className="text-[#b8860b]">*</span>
        </label>
        {pickup && (
          <button
            type="button"
            onClick={onClearPickup}
            className="text-[11px] text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            Change
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <span className="w-3 h-3 rounded-full border-2 border-slate-700 bg-white" />
        </div>
        <input
          ref={pickupInputRef}
          id="pickup-input"
          type="text"
          required
          value={pickup}
          onFocus={onFocus}
          onChange={(e) => onPickupChange(e.target.value)}
          placeholder="Pick-up (e.g. Sydney Airport, Sydney CBD)..."
          className={`w-full pl-10 pr-9 py-3 rounded-xl bg-slate-50/70 border text-slate-900 placeholder-slate-400 text-sm outline-none transition-all shadow-xs ${
            pickupNotice
              ? "border-amber-500 ring-2 ring-amber-500/20"
              : "border-slate-300 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900"
          }`}
        />
        {isLoadingPickup ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : pickup ? (
          <button
            type="button"
            onClick={onClearPickup}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            ✕
          </button>
        ) : null}
      </div>

      {pickupNotice && (
        <p className="mt-1 text-xs text-amber-700 font-medium flex items-center gap-1">
          <span>⚠️</span> {pickupNotice}
        </p>
      )}

      {/* Pickup Dropdown Suggestions */}
      {showPickupDropdown && pickupSuggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl py-1 divide-y divide-slate-100">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-50">
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
                className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-amber-50 text-slate-900 font-semibold"
                    : "hover:bg-slate-50 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-sm">📍</span>
                  <div>
                    <p className="text-sm font-medium group-hover:text-slate-900 transition-colors">
                      {placeObj.name}
                    </p>
                    {placeObj.address && (
                      <p className="text-xs text-slate-500">
                        {placeObj.address}
                      </p>
                    )}
                  </div>
                </div>
                {placeObj.code && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
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
