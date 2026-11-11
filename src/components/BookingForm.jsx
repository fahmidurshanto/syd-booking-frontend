"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HughesTripSummaryCard from "@/components/HughesTripSummaryCard";
import {
  ConfirmationModal,
  DatePickerInput,
  DropoffLocationInput,
  getTodayStr,
  PassengerDetailsForm,
  PickupLocationInput,
  TimePickerInput,
} from "@/utils";
import { getStoredCustomer, saveCustomerBooking } from "@/utils/customerAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function BookingForm({ category = "chauffeur" }) {
  const isChauffeur = category === "chauffeur";

  // Location inputs: state stores object { name, fullAddress, lat, lng } or string
  const [pickupPlace, setPickupPlace] = useState(null);
  const [dropoffPlace, setDropoffPlace] = useState(null);

  // Booking Form State
  const [todayStr, setTodayStr] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  // Date & Time Picker UI State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(null);

  // Calculated Fare Data from Backend
  const [fareData, setFareData] = useState(null);
  const [isCalculatingFare, setIsCalculatingFare] = useState(false);

  // Booking submission & confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const dateContainerRef = useRef(null);
  const timeContainerRef = useRef(null);
  const nativeDateInputRef = useRef(null);
  const nativeTimeInputRef = useRef(null);

  // Initialize client date on mount to prevent SSR prerender mismatch
  useEffect(() => {
    const today = getTodayStr();
    setTodayStr(today);
    setPickupDate(today);
    setCalendarViewDate(new Date());

    // 1-Click Auto-fill from logged-in customer profile
    const loggedCustomer = getStoredCustomer();
    if (loggedCustomer) {
      if (loggedCustomer.fullName) setPassengerName(loggedCustomer.fullName);
      if (loggedCustomer.phone) setPassengerPhone(loggedCustomer.phone);
      if (loggedCustomer.email) setPassengerEmail(loggedCustomer.email);
      if (loggedCustomer.preferences?.defaultPassengers) {
        setPassengers(loggedCustomer.preferences.defaultPassengers);
      }
      if (loggedCustomer.preferences?.defaultLuggage) {
        setLuggage(loggedCustomer.preferences.defaultLuggage);
      }
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dateContainerRef.current &&
        !dateContainerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        timeContainerRef.current &&
        !timeContainerRef.current.contains(event.target)
      ) {
        setShowTimePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers for location selection
  const handleSelectPickup = (place) => {
    setPickupPlace(place);
  };

  const handleClearPickup = () => {
    setPickupPlace(null);
    setFareData(null);
  };

  const handleSelectDropoff = (place) => {
    setDropoffPlace(place);
  };

  const handleClearDropoff = () => {
    setDropoffPlace(null);
    setFareData(null);
  };

  // Swap pickup and dropoff
  const handleSwapLocations = () => {
    if (!pickupPlace || !dropoffPlace) return;
    const oldP = pickupPlace;
    const oldD = dropoffPlace;
    setPickupPlace(oldD);
    setDropoffPlace(oldP);
  };

  // Fetch distance-based fare whenever locations or vehicle changes
  useEffect(() => {
    if (
      !pickupPlace?.lat ||
      !pickupPlace?.lng ||
      !dropoffPlace?.lat ||
      !dropoffPlace?.lng
    ) {
      setFareData(null);
      return;
    }

    let isMounted = true;
    const fetchDistanceFare = async () => {
      try {
        setIsCalculatingFare(true);
        const params = new URLSearchParams({
          fromLat: pickupPlace.lat,
          fromLng: pickupPlace.lng,
          toLat: dropoffPlace.lat,
          toLng: dropoffPlace.lng,
          vehicle: isChauffeur ? "chauffeur" : "taxi",
          pickupTime: `${pickupDate}T${pickupTime}`,
          toName: dropoffPlace.name || "",
        });

        const res = await fetch(`${API_BASE}/fare/calculate?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success) {
            setFareData(data);
          }
        } else {
          if (isMounted) setFareData(null);
        }
      } catch (err) {
        console.warn("Fare calculate error:", err);
        if (isMounted) setFareData(null);
      } finally {
        if (isMounted) setIsCalculatingFare(false);
      }
    };

    const timer = setTimeout(fetchDistanceFare, 250);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pickupPlace, dropoffPlace, isChauffeur, pickupDate, pickupTime]);

  // Derived fare object for UI & modal
  const calculatedFare = fareData
    ? {
        total: fareData.fare,
        baseFare: fareData.breakdown?.baseFare || fareData.fare,
        currency: fareData.currency || "AUD",
        distanceKm: fareData.distanceKm,
        durationMin: fareData.durationMin,
        breakdown: fareData.breakdown,
      }
    : null;

  // Form Submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!pickupPlace?.name) {
      alert("Please select a pick-up location.");
      return;
    }

    if (!dropoffPlace?.name) {
      alert("Please select a drop-off destination.");
      return;
    }

    if (
      !passengerName.trim() ||
      !passengerPhone.trim() ||
      !passengerEmail.trim()
    ) {
      alert(
        "Please provide your contact name, mobile phone number, and email address."
      );
      return;
    }

    if (!calculatedFare || typeof calculatedFare.total !== "number") {
      alert("Please wait until the trip fare is calculated, or choose valid locations.");
      return;
    }

    try {
      setIsSubmitting(true);
      const bookingPayload = {
        pickup: {
          name: pickupPlace.name,
          address: pickupPlace.fullAddress || pickupPlace.name,
          lat: pickupPlace.lat,
          lng: pickupPlace.lng,
        },
        dropoff: {
          name: dropoffPlace.name,
          address: dropoffPlace.fullAddress || dropoffPlace.name,
          lat: dropoffPlace.lat,
          lng: dropoffPlace.lng,
        },
        pickupTime: new Date(`${pickupDate}T${pickupTime}`),
        passengers,
        luggage,
        vehicleType: isChauffeur ? "Chauffeur" : "Taxi",
        passengerName: passengerName.trim(),
        passengerPhone: passengerPhone.trim(),
        passengerEmail: passengerEmail.trim().toLowerCase(),
        fare: {
          currency: calculatedFare.currency || "AUD",
          total: calculatedFare.total,
          baseFare: calculatedFare.baseFare,
          distanceKm: calculatedFare.distanceKm,
          durationMin: calculatedFare.durationMin,
        },
      };

      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        const data = await res.json();
        const finalBooking = data.booking || {
          ...bookingPayload,
          bookingNumber:
            "SYD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: "confirmed",
        };
        setConfirmedBooking(finalBooking);
        saveCustomerBooking(finalBooking);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(
          `Booking Notice: ${errorData.message || "Failed to create booking. Please try again."}`
        );
      }
    } catch {
      alert(
        "Unable to reach the booking server. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const pickupDisplayName = pickupPlace?.name || "";
  const dropoffDisplayName = dropoffPlace?.name || "";

  return (
    <div className="w-full max-w-7xl">
      {/* Confirmation Modal */}
      <ConfirmationModal
        confirmedBooking={confirmedBooking}
        isChauffeur={isChauffeur}
        calculatedFare={calculatedFare}
        pickupDate={pickupDate}
        pickupTime={pickupTime}
        passengers={passengers}
        luggage={luggage}
        passengerName={passengerName}
        passengerPhone={passengerPhone}
        passengerEmail={passengerEmail}
        onClose={() => setConfirmedBooking(null)}
        onReset={() => {
          setConfirmedBooking(null);
          setPickupPlace(null);
          setDropoffPlace(null);
          setFareData(null);
        }}
      />

      {/* Breadcrumb Steps Header */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold">
            1
          </span>
          <span>Journey</span>
        </div>
        <span className="text-slate-300">›</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[11px]">
            2
          </span>
          <span>Vehicle &amp; Class</span>
        </div>
        <span className="text-slate-300">›</span>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[11px]">
            3
          </span>
          <span>Details</span>
        </div>
      </div>

      {/* Main Title & Hero Text */}
      <div className="mb-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Where are we taking you?
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl">
              Transparent upfront pricing, distance-based travel calculation, and free cancellation up to 2 hours before pick-up.
            </p>
          </div>

          {/* Quick Vehicle Switcher Badge */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs text-xs">
            <Link
              href="/book/chauffeur"
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                isChauffeur
                  ? "bg-slate-900 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chauffeur
            </Link>
            <Link
              href="/book/taxi"
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                !isChauffeur
                  ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Taxi
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Main Layout: Left = Form, Right = Hughes Live Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Booking Configurator Card (Span 7) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleBookingSubmit}
            className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 space-y-5 shadow-lg text-slate-900"
          >
            {/* Connected Route Input Section */}
            <div className="relative space-y-3">
              {/* Pickup Location */}
              <PickupLocationInput
                pickup={pickupDisplayName}
                onSelectPickup={handleSelectPickup}
                onClearPickup={handleClearPickup}
              />

              {/* Swap Button between Pickup & Dropoff */}
              <div className="flex justify-end pr-2 -my-2 relative z-10">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  title="Swap Pick-up and Destination"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs text-xs font-bold"
                >
                  ⇅
                </button>
              </div>

              {/* Dropoff Destination */}
              <DropoffLocationInput
                dropoff={dropoffDisplayName}
                onSelectDropoff={handleSelectDropoff}
                onClearDropoff={handleClearDropoff}
              />
            </div>

            {/* Distance / Duration readout strip when calculated */}
            {fareData && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📏</span>
                  <span>
                    Distance:{" "}
                    <strong className="text-slate-900 font-semibold">
                      {fareData.distanceKm} km
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">⏱️</span>
                  <span>
                    Est. Duration:{" "}
                    <strong className="text-slate-900 font-semibold">
                      {fareData.durationMin} mins
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {/* Date, Time & Passenger Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <DatePickerInput
                  pickupDate={pickupDate}
                  setPickupDate={setPickupDate}
                  todayStr={todayStr}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                  setShowTimePicker={setShowTimePicker}
                  calendarViewDate={calendarViewDate}
                  setCalendarViewDate={setCalendarViewDate}
                  dateContainerRef={dateContainerRef}
                  nativeDateInputRef={nativeDateInputRef}
                  isChauffeur={isChauffeur}
                />
              </div>

              <div>
                <TimePickerInput
                  pickupTime={pickupTime}
                  setPickupTime={setPickupTime}
                  showTimePicker={showTimePicker}
                  setShowTimePicker={setShowTimePicker}
                  timeContainerRef={timeContainerRef}
                  nativeTimeInputRef={nativeTimeInputRef}
                  isChauffeur={isChauffeur}
                />
              </div>

              {/* Passengers Quick Stepper */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Passengers
                </label>
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-300 h-[42px]">
                  <button
                    type="button"
                    onClick={() => setPassengers((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold flex items-center justify-center cursor-pointer transition-colors text-xs"
                  >
                    −
                  </button>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassengers((prev) => Math.min(8, prev + 1))}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold flex items-center justify-center cursor-pointer transition-colors text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Passenger Contact & Bag Details */}
            <PassengerDetailsForm
              passengers={passengers}
              setPassengers={setPassengers}
              luggage={luggage}
              setLuggage={setLuggage}
              passengerName={passengerName}
              setPassengerName={setPassengerName}
              passengerPhone={passengerPhone}
              setPassengerPhone={setPassengerPhone}
              passengerEmail={passengerEmail}
              setPassengerEmail={setPassengerEmail}
            />

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setPickupPlace(null);
                  setDropoffPlace(null);
                  setFareData(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer py-2"
              >
                Start over
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !calculatedFare}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting || !calculatedFare
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : isChauffeur
                    ? "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 active:scale-[0.99]"
                    : "bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold shadow-amber-400/20 active:scale-[0.99]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                    <span>Reserving Ride...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Reserve Ride</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Hughes Live Trip Summary Card (Span 5) */}
        <div className="lg:col-span-5 sticky top-24">
          <HughesTripSummaryCard
            pickup={pickupDisplayName}
            dropoff={dropoffDisplayName}
            isChauffeur={isChauffeur}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            passengers={passengers}
            luggage={luggage}
            calculatedFare={calculatedFare}
            isCalculatingFare={isCalculatingFare}
          />
        </div>
      </div>
    </div>
  );
}
