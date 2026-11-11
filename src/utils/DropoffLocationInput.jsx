"use client";

import { useRef, useState } from "react";
import { usePhotonAutocomplete } from "./usePhotonAutocomplete";

export default function DropoffLocationInput({
  dropoff,
  onSelectDropoff,
  onClearDropoff,
}) {
  const [query, setQuery] = useState(dropoff || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { suggestions, isLoading, error } = usePhotonAutocomplete(
    showDropdown ? query : ""
  );

  function handleSelect(place) {
    setQuery(place.name);
    setShowDropdown(false);
    onSelectDropoff(place); // { name, fullAddress, lat, lng }
  }

  function handleClear() {
    setQuery("");
    setShowDropdown(false);
    onClearDropoff();
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="dropoff-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Drop-off Destination <span className="text-[#b8860b]">*</span>
        </label>
        {dropoff && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            Change
          </button>
        )}
      </div>

      {/* Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
          <span className="w-3 h-3 rounded-xs bg-slate-900" />
        </div>
        <input
          ref={inputRef}
          id="dropoff-input"
          type="text"
          required
          autoComplete="off"
          value={dropoff ? dropoff : query}
          disabled={!!dropoff}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => !dropoff && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Start typing destination or address..."
          className={`w-full pl-10 pr-9 py-3 rounded-xl text-sm outline-none transition-all shadow-xs ${
            dropoff
              ? "bg-emerald-50 border border-emerald-300 text-slate-900 cursor-default"
              : "bg-slate-50/70 border border-slate-300 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 text-slate-900 placeholder-slate-400"
          }`}
        />
        {isLoading && !dropoff ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dropoff ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {/* Dropdown */}
      {showDropdown && !dropoff && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl py-1 divide-y divide-slate-100">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-50 flex items-center gap-1.5">
            <span>🏁</span> Drop-off — Australia
          </div>

          {suggestions.length > 0 ? (
            suggestions.map((place, i) => (
              <button
                key={`${place.name}-${i}`}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(place);
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
              >
                <span className="text-slate-400 text-sm mt-0.5 shrink-0">🏁</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 truncate">
                    {place.name}
                  </p>
                  {place.fullAddress && place.fullAddress !== place.name && (
                    <p className="text-xs text-slate-500 truncate">
                      {place.fullAddress}
                    </p>
                  )}
                </div>
              </button>
            ))
          ) : query.length >= 3 && !isLoading ? (
            <div className="px-4 py-4 text-xs text-slate-500 text-center">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : query.length < 3 ? (
            <div className="px-4 py-3 text-xs text-slate-400 text-center">
              Type at least 3 characters…
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
