"use client";

import { formatDisplayDate } from "./dateTimeUtils";

export default function DatePickerInput({
  pickupDate,
  setPickupDate,
  todayStr = "",
  showDatePicker,
  setShowDatePicker,
  setShowTimePicker,
  calendarViewDate,
  setCalendarViewDate,
  dateContainerRef,
  nativeDateInputRef,
  isChauffeur,
}) {
  const activeDate = calendarViewDate || new Date(2026, 9, 27);

  return (
    <div ref={dateContainerRef} className="relative">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="date-picker-btn"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
        >
          Pickup Date{" "}
          <span className={isChauffeur ? "text-[#c8a05c]" : "text-amber-400"}>
            *
          </span>
        </label>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => {
              if (todayStr) {
                setPickupDate(todayStr);
                setCalendarViewDate(new Date());
              }
            }}
            className={`px-2 py-0.5 rounded-md border text-xs transition-colors cursor-pointer ${
              pickupDate && pickupDate === todayStr
                ? isChauffeur
                  ? "bg-[#c8a05c]/20 border-[#c8a05c] text-[#e8c683]"
                  : "bg-amber-400/20 border-amber-400 text-amber-300"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              const tmrw = new Date(Date.now() + 86400000);
              const tmrwStr = `${tmrw.getFullYear()}-${String(
                tmrw.getMonth() + 1,
              ).padStart(2, "0")}-${String(tmrw.getDate()).padStart(2, "0")}`;
              setPickupDate(tmrwStr);
              setCalendarViewDate(tmrw);
            }}
            className="px-2 py-0.5 rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 text-xs transition-colors cursor-pointer"
          >
            Tomorrow
          </button>
        </div>
      </div>

      {/* Clickable Display Trigger */}
      <button
        id="date-picker-btn"
        type="button"
        onClick={() => {
          if (!calendarViewDate) {
            setCalendarViewDate(new Date());
          }
          setShowDatePicker((prev) => !prev);
          setShowTimePicker(false);
        }}
        className={`w-full px-4 py-3.5 rounded-xl bg-black/60 border text-white text-sm outline-none transition-all flex items-center justify-between cursor-pointer group ${
          showDatePicker
            ? isChauffeur
              ? "border-[#c8a05c] ring-1 ring-[#c8a05c]"
              : "border-amber-400 ring-1 ring-amber-400"
            : "border-white/15 hover:border-white/30"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <svg
            className={`w-4 h-4 shrink-0 ${
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium truncate">
            {formatDisplayDate(pickupDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            title="Open calendar picker"
            onClick={(e) => {
              e.stopPropagation();
              nativeDateInputRef.current?.showPicker?.();
            }}
            className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </button>

      {/* Hidden Native Date Input for Accessibility & Direct Picker */}
      <input
        ref={nativeDateInputRef}
        type="date"
        min={todayStr || undefined}
        value={pickupDate}
        onChange={(e) => {
          if (e.target.value) {
            setPickupDate(e.target.value);
            const [y, m, d] = e.target.value.split("-").map(Number);
            setCalendarViewDate(new Date(y, m - 1, d));
          }
        }}
        style={{ colorScheme: "dark" }}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Custom Interactive Calendar Popover */}
      {showDatePicker && (
        <div className="absolute z-40 top-full left-0 mt-2 w-full sm:w-[320px] bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-[0_15px_50px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-150">
          {/* Month & Year Navigation Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <button
              type="button"
              onClick={() => {
                setCalendarViewDate(
                  (prev) =>
                    new Date(
                      (prev || activeDate).getFullYear(),
                      (prev || activeDate).getMonth() - 1,
                      1,
                    ),
                );
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-sm"
            >
              ‹
            </button>
            <span className="font-semibold text-xs text-white uppercase tracking-wider">
              {activeDate.toLocaleDateString("en-AU", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={() => {
                setCalendarViewDate(
                  (prev) =>
                    new Date(
                      (prev || activeDate).getFullYear(),
                      (prev || activeDate).getMonth() + 1,
                      1,
                    ),
                );
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-sm"
            >
              ›
            </button>
          </div>

          {/* Day of Week Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-zinc-500 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before first day */}
            {Array.from({
              length: new Date(
                activeDate.getFullYear(),
                activeDate.getMonth(),
                1,
              ).getDay(),
            }).map((_, idx) => (
              <div key={`empty-${activeDate.getMonth()}-${idx}`} />
            ))}

            {/* Days of month */}
            {Array.from({
              length: new Date(
                activeDate.getFullYear(),
                activeDate.getMonth() + 1,
                0,
              ).getDate(),
            }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${activeDate.getFullYear()}-${String(
                activeDate.getMonth() + 1,
              ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const isPast = Boolean(todayStr && dateStr < todayStr);
              const isSelected = dateStr === pickupDate;
              const isToday = Boolean(todayStr && dateStr === todayStr);

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    setPickupDate(dateStr);
                    setShowDatePicker(false);
                  }}
                  className={`h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? isChauffeur
                        ? "bg-[#c8a05c] text-black font-bold shadow-md shadow-[#c8a05c]/40"
                        : "bg-amber-400 text-black font-bold shadow-md shadow-amber-400/40"
                      : isPast
                        ? "text-zinc-600 cursor-not-allowed opacity-30"
                        : "text-zinc-200 hover:bg-white/10 hover:text-white"
                  } ${
                    isToday && !isSelected
                      ? "border border-[#c8a05c]/60 font-semibold text-[#e8c683]"
                      : ""
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={() => {
                if (todayStr) {
                  setPickupDate(todayStr);
                  setCalendarViewDate(new Date());
                }
                setShowDatePicker(false);
              }}
              className="text-[#c8a05c] hover:underline font-medium cursor-pointer"
            >
              Select Today
            </button>
            <button
              type="button"
              onClick={() => {
                nativeDateInputRef.current?.showPicker?.();
              }}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Calendar Dialog ↗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
