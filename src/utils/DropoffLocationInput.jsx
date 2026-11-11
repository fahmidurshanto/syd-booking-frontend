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
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="dropoff-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Drop-off Destination <span className="text-[#b8860b]">*</span>
          {pickup && (
            <span className="ml-2 text-[11px] text-emerald-600 font-normal lowercase">
              (connected to {pickup})
            </span>
          )}
        </label>
        {dropoff && (
          <button
            type="button"
            onClick={onClearDropoff}
            className="text-[11px] text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            Change
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
          <span className="w-3 h-3 rounded-xs bg-slate-900" />
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
              ? `Drop-off (e.g. destinations connected to ${pickup})...`
              : "🔒 Select Pick-up location first..."
          }
          className={`w-full pl-10 pr-9 py-3 rounded-xl border text-sm outline-none transition-all shadow-xs ${
            !pickup.trim()
              ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-50/70 border-slate-300 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400"
          }`}
        />
        {isLoadingDropoff ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dropoff ? (
          <button
            type="button"
            onClick={onClearDropoff}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* Dropoff Dropdown Suggestions */}
      {showDropoffDropdown && pickup.trim() && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl py-1 divide-y divide-slate-100">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-slate-600 bg-slate-50 flex items-center justify-between">
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
                  className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400 text-sm">🏁</span>
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
                  <span className="text-xs text-slate-600 font-medium group-hover:translate-x-1 transition-transform">
                    Select →
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-4 text-xs text-slate-500 text-center">
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
