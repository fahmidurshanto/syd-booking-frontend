export const getTodayStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export const formatDisplayDate = (dStr) => {
  if (!dStr) return "Select pickup date";
  const parts = dStr.split("-").map(Number);
  if (parts.length !== 3) return dStr;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  if (isNaN(date.getTime())) return dStr;
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDisplayTime = (tStr) => {
  if (!tStr) return "Select pickup time";
  const [h, m] = tStr.split(":").map(Number);
  if (isNaN(h)) return tStr;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m ?? 0).padStart(2, "0")} ${period}`;
};

export const parseTime = (timeStr) => {
  const [h24Str, mStr] = (timeStr || "10:00").split(":");
  let h24 = parseInt(h24Str, 10);
  if (isNaN(h24)) h24 = 10;
  const m = parseInt(mStr, 10) || 0;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return {
    h12,
    minute: m,
    period,
    h12Str: String(h12).padStart(2, "0"),
    minuteStr: String(m).padStart(2, "0"),
  };
};

export const composeTime = (h12, minute, period) => {
  let h24 = Number(h12) % 12;
  if (period === "PM") h24 += 12;
  const m = Number(minute);
  return `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};
