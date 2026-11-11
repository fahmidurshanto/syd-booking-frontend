"use client";

import { composeTime, parseTime } from "./dateTimeUtils";

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
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor="pickup-hour-select"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Pick-up Time <span className="text-[#b8860b]">*</span>
        </label>
        <div className="flex items-center gap-1 text-[11px]">
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
            className="px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 bg-white text-xs transition-colors cursor-pointer"
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
            className="px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 bg-white text-xs transition-colors cursor-pointer"
          >
            +1h
          </button>
        </div>
      </div>

      {/* Select Controls */}
      <div className="grid grid-cols-12 gap-1.5">
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
            className="w-full py-2.5 px-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium outline-none text-center cursor-pointer appearance-none focus:border-slate-900 focus:bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
              <option key={h} value={h} className="bg-white text-slate-900">
                {String(h).padStart(2, "0")} hr
              </option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
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
            className="w-full py-2.5 px-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium outline-none text-center cursor-pointer appearance-none focus:border-slate-900 focus:bg-white"
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
              <option key={m} value={m} className="bg-white text-slate-900">
                :{m} min
              </option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
            ▾
          </span>
        </div>

        {/* AM / PM Segmented Buttons */}
        <div className="col-span-4 flex rounded-xl border border-slate-300 bg-slate-50 p-0.5">
          <button
            type="button"
            onClick={() => {
              const { h12, minute } = parseTime(pickupTime);
              setPickupTime(composeTime(h12, minute, "AM"));
            }}
            className={`flex-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeParsed.period === "AM"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
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
            className={`flex-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeParsed.period === "PM"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
}
