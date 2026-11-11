"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

  // Location inputs & autocomplete state
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [allPlaces, setAllPlaces] = useState([]);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [connectedDestinations, setConnectedDestinations] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [isLoadingPickup, setIsLoadingPickup] = useState(false);
  const [isLoadingDropoff, setIsLoadingDropoff] = useState(false);
  const [pickupNotice, setPickupNotice] = useState("");

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

  // Route Quote State
  const [routeData, setRouteData] = useState(null);
  const [isCalculatingFare, setIsCalculatingFare] = useState(false);

  // Booking submission & confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const pickupContainerRef = useRef(null);
  const dropoffContainerRef = useRef(null);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const dateContainerRef = useRef(null);
  const timeContainerRef = useRef(null);
  const nativeDateInputRef = useRef(null);
  const nativeTimeInputRef = useRef(null);

  // 1. Initial load: fetch all unique route places
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPickup(true);
    fetch(`${API_BASE}/routes/all?details=true`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.places) {
          setAllPlaces(data.places);
          setPickupSuggestions(data.places);
        }
      })
      .catch((err) => {
        console.warn("Could not load initial places:", err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoadingPickup(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickupContainerRef.current &&
        !pickupContainerRef.current.contains(event.target)
      ) {
        setShowPickupDropdown(false);
      }
      if (
        dropoffContainerRef.current &&
        !dropoffContainerRef.current.contains(event.target)
      ) {
        setShowDropoffDropdown(false);
      }
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

  // 2. Fetch connected destinations when pickup is chosen
  const fetchDestinationsForPickup = useCallback(async (originPlace) => {
    if (!originPlace || !originPlace.trim()) {
      setConnectedDestinations([]);
      setDropoffSuggestions([]);
      return [];
    }
    try {
      setIsLoadingDropoff(true);
      const res = await fetch(
        `${API_BASE}/routes/destinations?from=${encodeURIComponent(
          originPlace.trim(),
        )}`,
      );
      if (res.ok) {
        const data = await res.json();
        const rawList = data.destinations || data.places || [];
        const list = Array.isArray(rawList) ? rawList : [];
        setConnectedDestinations(list);
        setDropoffSuggestions(list);
        return list;
      }
      setConnectedDestinations([]);
      setDropoffSuggestions([]);
      return [];
    } catch {
      setConnectedDestinations([]);
      setDropoffSuggestions([]);
      return [];
    } finally {
      setIsLoadingDropoff(false);
    }
  }, []);

  // Filter pickup locations as user types
  const handlePickupChange = (value) => {
    setPickup(value);
    setPickupNotice("");
    setShowPickupDropdown(true);

    if (!value.trim()) {
      setPickupSuggestions(allPlaces);
      return;
    }

    const filtered = allPlaces.filter((item) => {
      const name = typeof item === "string" ? item : item.name || "";
      const addr = typeof item === "object" ? item.address || "" : "";
      return (
        name.toLowerCase().includes(value.toLowerCase()) ||
        addr.toLowerCase().includes(value.toLowerCase())
      );
    });
    setPickupSuggestions(filtered);
  };

  // Select pickup from suggestions
  const handleSelectPickup = async (placeObj) => {
    const selectedName =
      typeof placeObj === "string" ? placeObj : placeObj.name;
    setPickup(selectedName);
    setPickupNotice("");
    setShowPickupDropdown(false);

    const validDestinations = await fetchDestinationsForPickup(selectedName);

    if (dropoff) {
      const isStillConnected = validDestinations.some((d) => {
        const dName = typeof d === "string" ? d : d.name;
        return dName.toLowerCase() === dropoff.toLowerCase();
      });
      if (!isStillConnected) {
        setDropoff("");
        setTimeout(() => {
          dropoffInputRef.current?.focus();
          setShowDropoffDropdown(true);
        }, 150);
      }
    } else {
      setTimeout(() => {
        dropoffInputRef.current?.focus();
        setShowDropoffDropdown(true);
      }, 150);
    }
  };

  // Filter dropoff destinations
  const handleDropoffChange = (value) => {
    setDropoff(value);
    setShowDropoffDropdown(true);

    if (!value.trim()) {
      setDropoffSuggestions(connectedDestinations);
      return;
    }

    const filtered = connectedDestinations.filter((item) => {
      const name = typeof item === "string" ? item : item.name || "";
      const addr = typeof item === "object" ? item.address || "" : "";
      return (
        name.toLowerCase().includes(value.toLowerCase()) ||
        addr.toLowerCase().includes(value.toLowerCase())
      );
    });
    setDropoffSuggestions(filtered);
  };

  // Select dropoff
  const handleSelectDropoff = (destObj) => {
    const selectedName = typeof destObj === "string" ? destObj : destObj.name;
    setDropoff(selectedName);
    setShowDropoffDropdown(false);
  };

  // Swap pickup and dropoff
  const handleSwapLocations = () => {
    if (!pickup || !dropoff) return;
    const oldPickup = pickup;
    const oldDropoff = dropoff;
    setPickup(oldDropoff);
    setDropoff(oldPickup);
    fetchDestinationsForPickup(oldDropoff);
  };

  const handleClearPickup = () => {
    setPickup("");
    setDropoff("");
    setRouteData(null);
    setPickupNotice("");
    setPickupSuggestions(allPlaces);
    setConnectedDestinations([]);
    setDropoffSuggestions([]);
    setShowPickupDropdown(false);
    setShowDropoffDropdown(false);
    pickupInputRef.current?.focus();
  };

  const handleClearDropoff = () => {
    setDropoff("");
    setRouteData(null);
    setDropoffSuggestions(connectedDestinations);
    setShowDropoffDropdown(false);
    dropoffInputRef.current?.focus();
  };

  const handleDropoffFocus = () => {
    if (!pickup.trim()) {
      setPickupNotice("Please choose a pick-up location first.");
      pickupInputRef.current?.focus();
      setShowPickupDropdown(true);
      return;
    }
    setShowDropoffDropdown(true);
    setShowPickupDropdown(false);
  };

  // 3. Look up live fare quote when both pickup & dropoff are selected
  useEffect(() => {
    if (!pickup.trim() || !dropoff.trim()) {
      setRouteData(null);
      return;
    }

    let isMounted = true;
    const fetchFare = async () => {
      try {
        setIsCalculatingFare(true);
        const res = await fetch(
          `${API_BASE}/routes/lookup?firstPlace=${encodeURIComponent(
            pickup.trim(),
          )}&lastPlace=${encodeURIComponent(dropoff.trim())}`,
        );
        if (res.ok) {
          const data = await res.json();
          // Extract route document whether returned as data.route or root data
          const resolved = data.route || data.place || data;
          if (isMounted) setRouteData(resolved);
        } else {
          if (isMounted) setRouteData(null);
        }
      } catch {
        if (isMounted) setRouteData(null);
      } finally {
        if (isMounted) setIsCalculatingFare(false);
      }
    };

    const timer = setTimeout(fetchFare, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pickup, dropoff]);

  // Dynamic Fare calculation - strictly from real database route
  const calculatedFare = (() => {
    if (!routeData) {
      return null;
    }

    const {
      vehicleAndFares = {},
      increaseFarePerPerson = {},
      currency = "AUD",
      distanceKm = null,
      durationMin = null,
    } = routeData;

    // Handle case-insensitive vehicle keys (e.g. Taxi/taxi, Chauffeur/chauffeur)
    const faresObj =
      vehicleAndFares instanceof Map
        ? Object.fromEntries(vehicleAndFares)
        : vehicleAndFares || {};

    const findFare = (key) => {
      const lower = key.toLowerCase();
      for (const [k, v] of Object.entries(faresObj)) {
        if (k.toLowerCase() === lower && typeof v === "number") return v;
      }
      return null;
    };

    const targetKey = isChauffeur ? "Chauffeur" : "Taxi";
    const rawBaseFare = findFare(targetKey);

    if (rawBaseFare === null || rawBaseFare === undefined) {
      return null;
    }

    const incObj =
      increaseFarePerPerson instanceof Map
        ? Object.fromEntries(increaseFarePerPerson)
        : increaseFarePerPerson || {};

    const findInc = (key) => {
      const lower = key.toLowerCase();
      for (const [k, v] of Object.entries(incObj)) {
        if (k.toLowerCase() === lower && typeof v === "number") return v;
      }
      return 0;
    };

    const perPersonExtra = findInc(targetKey);
    const extraPassengers = Math.max(0, passengers - 1);
    const totalFare = Math.round(rawBaseFare + extraPassengers * perPersonExtra);

    return {
      total: totalFare,
      baseFare: rawBaseFare,
      currency,
      distanceKm,
      durationMin,
    };
  })();

  // 4. Form Submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!pickup.trim()) {
      alert("Please select a pick-up location.");
      pickupInputRef.current?.focus();
      return;
    }

    if (!dropoff.trim()) {
      alert("Please select a destination / drop-off location.");
      dropoffInputRef.current?.focus();
      return;
    }

    if (
      !passengerName.trim() ||
      !passengerPhone.trim() ||
      !passengerEmail.trim()
    ) {
      alert(
        "Please provide your contact name, mobile phone number, and email address.",
      );
      return;
    }

    if (!calculatedFare || typeof calculatedFare.total !== "number") {
      alert("Please wait until the route fare is calculated, or choose a valid route.");
      return;
    }

    try {
      setIsSubmitting(true);
      const bookingPayload = {
        pickup: pickup.trim(),
        dropoff: dropoff.trim(),
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
          bookingNumber: "SYD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          status: "confirmed",
        };
        setConfirmedBooking(finalBooking);
        saveCustomerBooking(finalBooking);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(
          `Booking Notice: ${errorData.message || "Failed to create booking. Please try again."}`,
        );
      }
    } catch {
      alert(
        "Unable to reach the booking server. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setPickup("");
    setDropoff("");
    setRouteData(null);
  };

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
          setPickup("");
          setDropoff("");
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
              Fixed price, free cancellation up to 2 hours before pick-up, and guaranteed free waiting time at every pickup.
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
                pickup={pickup}
                pickupInputRef={pickupInputRef}
                pickupContainerRef={pickupContainerRef}
                isLoadingPickup={isLoadingPickup}
                pickupNotice={pickupNotice}
                showPickupDropdown={showPickupDropdown}
                pickupSuggestions={pickupSuggestions}
                onPickupChange={handlePickupChange}
                onSelectPickup={handleSelectPickup}
                onClearPickup={handleClearPickup}
                onFocus={() => {
                  setShowPickupDropdown(true);
                  setShowDropoffDropdown(false);
                }}
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
                dropoff={dropoff}
                dropoffInputRef={dropoffInputRef}
                dropoffContainerRef={dropoffContainerRef}
                pickup={pickup}
                isLoadingDropoff={isLoadingDropoff}
                showDropoffDropdown={showDropoffDropdown}
                dropoffSuggestions={dropoffSuggestions}
                onDropoffChange={handleDropoffChange}
                onSelectDropoff={handleSelectDropoff}
                onClearDropoff={handleClearDropoff}
                onFocus={handleDropoffFocus}
              />
            </div>

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
              isChauffeur={isChauffeur}
            />

            {/* Bottom Form Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleStartOver}
                className="text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer"
              >
                Start over
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isSubmitting
                  ? "Confirming Booking..."
                  : "Confirm & Reserve Ride →"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Hughes Live Visual Trip Summary Card (Span 5) */}
        <div className="lg:col-span-5 sticky top-6">
          <HughesTripSummaryCard
            pickup={pickup}
            dropoff={dropoff}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            passengers={passengers}
            luggage={luggage}
            calculatedFare={calculatedFare}
            isCalculatingFare={isCalculatingFare}
            isChauffeur={isChauffeur}
          />
        </div>
      </div>
    </div>
  );
}
