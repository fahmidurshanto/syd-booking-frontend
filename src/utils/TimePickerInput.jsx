"use client";

import { composeTime, formatDisplayTime, parseTime } from "./dateTimeUtils";

export default function TimePickerInput({
  pickupTime,
  setPickupTime,
  showTimePicker,
  setShowTimePicker,
  timeContainerRef,
  nativeTimeInputRef,
  isChauffeur,
}) {
  const timeParsed = parseTime(pickupTime);

  return (
    <div ref={timeContainerRef} className="relative">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="pickup-hour-select"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          Pickup Time{" "}
          <span className={isChauffeur ? "text-[#c8a05c]" : "text-amber-400"}>
            *
          </span>
        </label>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => {
              const now = new Date();
              setPickupTime(
                `${String(now.getHours()).padStart(2, "0")}:${String(
                  now.getMinutes(),
                ).padStart(2, "0")}`,
              );
            }}
            className="px-2 py-0.5 rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 text-xs transition-colors cursor-pointer"
          >
            Now
          </button>
          <button
            type="button"
            onClick={() => {
              const d = new Date();
              d.setHours(d.getHours() + 1);
              setPickupTime(`${String(d.getHours()).padStart(2, "0")}:00`);
            }}
            className="px-2 py-0.5 rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 text-xs transition-colors cursor-pointer"
          >
            +1h
          </button>
        </div>
      </div>

      {/* Separately Selectable Hour, Minutes, AM/PM Controls */}
      <div className="grid grid-cols-12 gap-2">
        {/* Hour Dropdown */}
        <div className="col-span-4 relative">
          <select
            id="pickup-hour-select"
            aria-label="Select Pickup Hour"
            value={timeParsed.h12}
            onChange={(e) => {
              const { minute, period } = parseTime(pickupTime);
              setPickupTime(
                composeTime(Number(e.target.value), minute, period),
              );
            }}
            className={`w-full py-3.5 px-3 rounded-xl bg-black/60 border text-white text-sm outline-none font-medium transition-all text-center cursor-pointer appearance-none ${
              isChauffeur
                ? "border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c]"
                : "border-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
              <option key={h} value={h} className="bg-zinc-900 text-white">
                {String(h).padStart(2, "0")} hr
              </option>
            ))}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">
            ▾
          </span>
        </div>

        {/* Minutes Dropdown */}
        <div className="col-span-4 relative">
          <select
            id="pickup-minute-select"
            aria-label="Select Pickup Minute"
            value={timeParsed.minuteStr}
            onChange={(e) => {
              const { h12, period } = parseTime(pickupTime);
              setPickupTime(composeTime(h12, Number(e.target.value), period));
            }}
            className={`w-full py-3.5 px-3 rounded-xl bg-black/60 border text-white text-sm outline-none font-medium transition-all text-center cursor-pointer appearance-none ${
              isChauffeur
                ? "border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c]"
                : "border-white/15 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            }`}
          >
            {[
              "00",
              "05",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
            ].map((m) => (
              <option key={m} value={m} className="bg-zinc-900 text-white">
                :{m} min
              </option>
            ))}
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-xs">
            ▾
          </span>
        </div>

        {/* AM / PM Segmented Buttons */}
        <div className="col-span-4 flex rounded-xl border border-white/15 bg-black/60 p-1">
          <button
            type="button"
            onClick={() => {
              const { h12, minute } = parseTime(pickupTime);
              setPickupTime(composeTime(h12, minute, "AM"));
            }}
            className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              timeParsed.period === "AM"
                ? isChauffeur
                  ? "bg-[#c8a05c] text-black shadow-md shadow-[#c8a05c]/30"
                  : "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => {
              const { h12, minute } = parseTime(pickupTime);
              setPickupTime(composeTime(h12, minute, "PM"));
            }}
            className={`flex-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              timeParsed.period === "PM"
                ? isChauffeur
                  ? "bg-[#c8a05c] text-black shadow-md shadow-[#c8a05c]/30"
                  : "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            PM
          </button>
        </div>
      </div>

      {/* Time Summary & Modal Opener Bar */}
      <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 px-1">
        <span className="flex items-center gap-1.5">
          <svg
            className={`w-3.5 h-3.5 ${
              isChauffeur ? "text-[#c8a05c]" : "text-amber-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Selected:{" "}
            <strong className="text-white font-mono">
              {formatDisplayTime(pickupTime)}
            </strong>{" "}
            ({pickupTime})
          </span>
        </span>
        <button
          type="button"
          onClick={() => setShowTimePicker((prev) => !prev)}
          className={`hover:underline cursor-pointer transition-colors text-[11px] font-medium ${
            isChauffeur ? "text-[#e8c683]" : "text-amber-300"
          }`}
        >
          {showTimePicker ? "Hide grid ▴" : "Time grid ▾"}
        </button>
      </div>

      {/* Hidden Native Time Input for Accessibility */}
      <input
        ref={nativeTimeInputRef}
        type="time"
        value={pickupTime}
        onChange={(e) => {
          if (e.target.value) setPickupTime(e.target.value);
        }}
        style={{ colorScheme: "dark" }}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Expanded Interactive Popover with 3 Columns: Hour, Minute, AM/PM */}
      {showTimePicker && (
        <div className="absolute z-40 top-full left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-[340px] bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-[0_15px_50px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="font-semibold text-xs text-white uppercase tracking-wider">
              Pick Hour • Minute • AM/PM
            </span>
            <span className="text-xs font-mono font-bold text-[#c8a05c]">
              {formatDisplayTime(pickupTime)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Hours column */}
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1.5">
                Hour
              </span>
              <div className="max-h-44 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                  const isSelected = parseTime(pickupTime).h12 === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        const { minute, period } = parseTime(pickupTime);
                        setPickupTime(composeTime(h, minute, period));
                      }}
                      className={`w-full py-1.5 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer ${
                        isSelected
                          ? isChauffeur
                            ? "bg-[#c8a05c] text-black font-bold shadow-sm"
                            : "bg-amber-400 text-black font-bold shadow-sm"
                          : "text-zinc-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes column */}
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1.5">
                Minute
              </span>
              <div className="max-h-44 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                {[
                  "00",
                  "05",
                  "10",
                  "15",
                  "20",
                  "25",
                  "30",
                  "35",
                  "40",
                  "45",
                  "50",
                  "55",
                ].map((m) => {
                  const isSelected = parseTime(pickupTime).minuteStr === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        const { h12, period } = parseTime(pickupTime);
                        setPickupTime(composeTime(h12, Number(m), period));
                      }}
                      className={`w-full py-1.5 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer ${
                        isSelected
                          ? isChauffeur
                            ? "bg-[#c8a05c] text-black font-bold shadow-sm"
                            : "bg-amber-400 text-black font-bold shadow-sm"
                          : "text-zinc-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      :{m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AM / PM column */}
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-400 text-center mb-1.5">
                Period
              </span>
              <div className="space-y-2 pt-1">
                {["AM", "PM"].map((p) => {
                  const isSelected = parseTime(pickupTime).period === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        const { h12, minute } = parseTime(pickupTime);
                        setPickupTime(composeTime(h12, minute, p));
                      }}
                      className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isSelected
                          ? isChauffeur
                            ? "bg-[#c8a05c] text-black font-bold shadow-md shadow-[#c8a05c]/30"
                            : "bg-amber-400 text-black font-bold shadow-md shadow-amber-400/30"
                          : "border border-white/15 text-zinc-400 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                setPickupTime(
                  `${String(now.getHours()).padStart(2, "0")}:${String(
                    now.getMinutes(),
                  ).padStart(2, "0")}`,
                );
                setShowTimePicker(false);
              }}
              className="text-[#c8a05c] hover:underline font-medium cursor-pointer"
            >
              Set to Current Time
            </button>
            <button
              type="button"
              onClick={() => setShowTimePicker(false)}
              className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
            >
              Done ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
