"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConfirmationModal,
  DatePickerInput,
  DropoffLocationInput,
  getTodayStr,
  PassengerDetailsForm,
  PickupLocationInput,
  RouteFareSummary,
  ServiceHeader,
  TimePickerInput,
} from "@/utils";

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
  const [flightNumber, setFlightNumber] = useState("");
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
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoadingPickup(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdowns & popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Fetch connected destinations for a given pickup place
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
        const dests = data.places || [];
        setConnectedDestinations(dests);
        setDropoffSuggestions(dests);
        return dests;
      }
      return [];
    } catch {
      return [];
    } finally {
      setIsLoadingDropoff(false);
    }
  }, []);

  // Filter pickup locations when user types
  const handlePickupChange = (value) => {
    setPickup(value);
    setPickupNotice("");
    setShowPickupDropdown(true);

    if (!value.trim()) {
      setPickupSuggestions(allPlaces);
      setConnectedDestinations([]);
      setDropoffSuggestions([]);
      setDropoff("");
      setRouteData(null);
      return;
    }

    const lower = value.trim().toLowerCase();
    const filtered = allPlaces.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(lower);
      const codeMatch = p.code && p.code.toLowerCase().includes(lower);
      const addrMatch = p.address && p.address.toLowerCase().includes(lower);
      return nameMatch || codeMatch || addrMatch;
    });

    setPickupSuggestions(filtered);
  };

  // Select a Pickup location
  const handleSelectPickup = async (place) => {
    const placeName = typeof place === "string" ? place : place.name;
    setPickup(placeName);
    setShowPickupDropdown(false);
    setPickupNotice("");

    // Reset dropoff when switching pickup
    setDropoff("");
    setRouteData(null);

    // Fetch connected destinations for this pickup
    await fetchDestinationsForPickup(placeName);

    // Automatically focus dropoff and show its connected dropdown
    setShowDropoffDropdown(true);
    setTimeout(() => {
      dropoffInputRef.current?.focus();
    }, 60);
  };

  const handleClearPickup = () => {
    setPickup("");
    setDropoff("");
    setConnectedDestinations([]);
    setRouteData(null);
    pickupInputRef.current?.focus();
    setShowPickupDropdown(true);
  };

  // Filter dropoff destinations when user types
  const handleDropoffChange = (value) => {
    setDropoff(value);
    setShowDropoffDropdown(true);

    if (!value.trim()) {
      setDropoffSuggestions(connectedDestinations);
      setRouteData(null);
      return;
    }

    const lower = value.trim().toLowerCase();
    const sourceList =
      connectedDestinations.length > 0 ? connectedDestinations : allPlaces;

    const filtered = sourceList.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(lower);
      const codeMatch = p.code && p.code.toLowerCase().includes(lower);
      const addrMatch = p.address && p.address.toLowerCase().includes(lower);
      return nameMatch || codeMatch || addrMatch;
    });

    setDropoffSuggestions(filtered);
  };

  // Select a Drop-off location
  const handleSelectDropoff = (place) => {
    const placeName = typeof place === "string" ? place : place.name;
    setDropoff(placeName);
    setShowDropoffDropdown(false);
  };

  const handleClearDropoff = () => {
    setDropoff("");
    setRouteData(null);
    dropoffInputRef.current?.focus();
    handleDropoffFocus();
  };

  // When user focuses or clicks Dropoff
  const handleDropoffFocus = async () => {
    if (!pickup.trim()) {
      setShowDropoffDropdown(false);
      setPickupNotice("Please choose your pickup location first");
      if (pickupInputRef.current) {
        pickupInputRef.current.focus();
        setShowPickupDropdown(true);
      }
      return;
    }

    setShowDropoffDropdown(true);
    setShowPickupDropdown(false);

    if (connectedDestinations.length === 0) {
      await fetchDestinationsForPickup(pickup);
    } else {
      setDropoffSuggestions(connectedDestinations);
    }
  };

  // 3. Lookup route fare whenever both pickup & dropoff are populated
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
          if (isMounted) {
            setRouteData(data.route || null);
          }
        } else {
          if (isMounted) setRouteData(null);
        }
      } catch {
        if (isMounted) setRouteData(null);
      } finally {
        if (isMounted) setIsCalculatingFare(false);
      }
    };

    fetchFare();
    return () => {
      isMounted = false;
    };
  }, [pickup, dropoff]);

  // Calculate live fare
  const calculateTotalFare = () => {
    if (!routeData?.vehicleAndFares) {
      return null;
    }

    const vFares = routeData.vehicleAndFares;
    let baseFare = 0;
    let vehicleKey = "taxi";

    if (isChauffeur) {
      vehicleKey = "Chauffeur";
      baseFare =
        vFares.Chauffeur ??
        vFares.chauffeur ??
        vFares.executive ??
        vFares.luxury ??
        vFares.sedan ??
        Object.values(vFares)[0] ??
        85;
    } else {
      vehicleKey = "Taxi";
      baseFare =
        vFares.Taxi ??
        vFares.taxi ??
        Object.values(vFares)[1] ??
        Object.values(vFares)[0] ??
        65;
    }

    const perPersonInc =
      routeData.increaseFarePerPerson?.[vehicleKey] ||
      routeData.increaseFarePerPerson?.[vehicleKey.toLowerCase()] ||
      routeData.increaseFarePerPerson?.Taxi ||
      routeData.increaseFarePerPerson?.taxi ||
      10;

    const extraPassengers = Math.max(0, passengers - 1);
    const total = baseFare + extraPassengers * perPersonInc;

    return {
      total,
      currency: routeData.currency || "AUD",
      distanceKm: routeData.distanceKm,
      durationMin: routeData.durationMin,
    };
  };

  const calculatedFare = calculateTotalFare();

  // Form Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!pickup.trim()) {
      alert("Please select a pickup location.");
      pickupInputRef.current?.focus();
      return;
    }

    if (!dropoff.trim()) {
      alert("Please select a drop-off destination.");
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
          currency: calculatedFare?.currency || "AUD",
          total: calculatedFare?.total || (isChauffeur ? 95 : 75),
        },
      };

      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmedBooking(data.booking || bookingPayload);
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

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
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

      {/* Header, Switcher, Features & Quick Airports */}
      <ServiceHeader
        isChauffeur={isChauffeur}
        pickup={pickup}
        onQuickSelect={handleSelectPickup}
      />

      {/* Main Form */}
      <form
        onSubmit={handleBookingSubmit}
        className="mt-8 w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
      >
        {/* Step 1: PICKUP LOCATION */}
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

        {/* Step 2: DROP-OFF DESTINATION */}
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

        {/* Live Route Fare & Distance Summary */}
        <RouteFareSummary
          isCalculatingFare={isCalculatingFare}
          calculatedFare={calculatedFare}
          pickup={pickup}
          dropoff={dropoff}
          isChauffeur={isChauffeur}
        />

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Passenger, Luggage, Flight & Contact Details */}
        <PassengerDetailsForm
          passengers={passengers}
          setPassengers={setPassengers}
          luggage={luggage}
          setLuggage={setLuggage}
          flightNumber={flightNumber}
          setFlightNumber={setFlightNumber}
          passengerName={passengerName}
          setPassengerName={setPassengerName}
          passengerPhone={passengerPhone}
          setPassengerPhone={setPassengerPhone}
          passengerEmail={passengerEmail}
          setPassengerEmail={setPassengerEmail}
          isChauffeur={isChauffeur}
        />

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-4">
          <Link
            href="/book"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 hover:border-white text-zinc-300 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors text-center"
          >
            ← Back to Categories
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:flex-1 py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-sm text-black shadow-xl transition-all transform active:scale-95 cursor-pointer ${
              isChauffeur
                ? "bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] hover:from-[#d6af70] hover:to-[#eed095] hover:shadow-[0_0_25px_rgba(200,160,92,0.4)]"
                : "bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]"
            }`}
          >
            {isSubmitting
              ? "Confirming Booking..."
              : "Confirm & Reserve Ride →"}
          </button>
        </div>
      </form>
    </div>
  );
}
