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
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="date-picker-btn"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Pick-up Date <span className="text-[#b8860b]">*</span>
        </label>
        <div className="flex items-center gap-1 text-[11px]">
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
                ? "bg-slate-900 border-slate-900 text-white font-semibold"
                : "border-slate-200 text-slate-600 hover:text-slate-900 bg-white"
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
            className="px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 bg-white text-xs transition-colors cursor-pointer"
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
        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-xs outline-none transition-all flex items-center justify-between cursor-pointer group shadow-xs ${
          showDatePicker
            ? "border-slate-900 ring-1 ring-slate-900 bg-white"
            : "border-slate-300 hover:border-slate-400"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <svg
            className="w-4 h-4 text-slate-600 shrink-0"
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
          <span className="font-semibold truncate text-slate-800">
            {formatDisplayDate(pickupDate)}
          </span>
        </div>
        <div className="text-slate-400 text-xs">📅</div>
      </button>

      {/* Hidden Native Date Input */}
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
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Custom Light Calendar Popup */}
      {showDatePicker && (
        <div className="absolute z-50 left-0 mt-2 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl w-72 text-slate-900">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
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
              className="p-1 rounded-md hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer text-sm font-bold"
            >
              ‹
            </button>
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
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
              className="p-1 rounded-md hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer text-sm font-bold"
            >
              ›
            </button>
          </div>

          {/* Day of Week Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-slate-400 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="py-0.5">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({
              length: new Date(
                activeDate.getFullYear(),
                activeDate.getMonth(),
                1,
              ).getDay(),
            }).map((_, idx) => (
              <div key={`empty-${activeDate.getMonth()}-${idx}`} />
            ))}

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
                  className={`h-7 w-7 text-xs rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white font-bold shadow-xs"
                      : isPast
                        ? "text-slate-300 cursor-not-allowed opacity-30"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  } ${
                    isToday && !isSelected
                      ? "border border-amber-500 font-bold text-amber-700"
                      : ""
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
