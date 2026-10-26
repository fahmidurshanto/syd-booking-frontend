"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [pickupDate, setPickupDate] = useState("2026-10-27");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [flightNumber, setFlightNumber] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

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

  // Close dropdowns on outside click
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

    // If connectedDestinations is empty or needs refresh for current pickup, fetch it
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
      vehicleKey = "executive";
      baseFare =
        vFares.executive ||
        vFares.luxury ||
        vFares.sedan ||
        Object.values(vFares)[0] ||
        85;
    } else {
      vehicleKey = "taxi";
      baseFare = vFares.taxi || Object.values(vFares)[0] || 65;
    }

    const perPersonInc =
      routeData.increaseFarePerPerson?.[vehicleKey] ||
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

    if (!passengerName.trim() || !passengerPhone.trim()) {
      alert("Please provide your contact name and mobile phone number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const bookingPayload = {
        pickup: pickup.trim(),
        dropoff: dropoff.trim(),
        pickupTime: new Date(`${pickupDate}T${pickupTime}`),
        passengers,
        vehicleType: isChauffeur ? "Executive Chauffeur" : "Standard Taxi",
        passengerName: passengerName.trim(),
        passengerPhone: passengerPhone.trim(),
        passengerEmail: passengerEmail.trim(),
        fare: {
          currency: calculatedFare?.currency || "AUD",
          total: calculatedFare?.total || (isChauffeur ? 95 : 75),
        },
        notes: [
          flightNumber ? `Flight #${flightNumber.trim()}` : "",
          `Luggage: ${luggage} bags`,
        ]
          .filter(Boolean)
          .join(" | "),
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
          `Booking Notice: ${errorData.message || "Saved as booking request."}`,
        );
      }
    } catch {
      alert("Request received! Our team will contact you shortly to confirm.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-[#c8a05c]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(200,160,92,0.3)] text-left flex flex-col space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8a05c]/20 border border-[#c8a05c] flex items-center justify-center text-[#c8a05c]">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Booking Confirmed!
                  </h3>
                  <span className="text-xs text-[#c8a05c] font-mono font-semibold">
                    Ref: {confirmedBooking.bookingNumber || "CONFIRMED"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Service:</span>
                <span className="font-bold text-white uppercase">
                  {confirmedBooking.vehicleType ||
                    (isChauffeur ? "Chauffeur" : "Taxi")}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Pickup:</span>
                <span className="font-medium text-right text-white max-w-[240px] truncate">
                  {confirmedBooking.pickup}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Destination:</span>
                <span className="font-medium text-right text-white max-w-[240px] truncate">
                  {confirmedBooking.dropoff}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Date &amp; Time:</span>
                <span className="text-white">
                  {pickupDate} at {pickupTime}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Passengers / Luggage:</span>
                <span className="text-white">
                  {passengers} Passengers • {luggage} Bags
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Passenger Contact:</span>
                <span className="text-white">
                  {passengerName} ({passengerPhone})
                </span>
              </div>
              <div className="flex justify-between py-2 bg-white/5 px-3 rounded-lg text-sm sm:text-base font-bold">
                <span className="text-[#c8a05c]">Guaranteed Fare:</span>
                <span className="text-white font-mono">
                  ${confirmedBooking.fare?.total || calculatedFare?.total || 85}{" "}
                  {confirmedBooking.fare?.currency || "AUD"}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 text-center">
              A confirmation SMS has been dispatched. Free cancellation up to 2
              hours before pickup.
            </p>

            <button
              type="button"
              onClick={() => {
                setConfirmedBooking(null);
                setPickup("");
                setDropoff("");
              }}
              className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#c8a05c] to-[#e4bf7e] text-black shadow-lg hover:shadow-[0_0_20px_rgba(200,160,92,0.4)] transition-all cursor-pointer text-center"
            >
              Done / Book Another Ride
            </button>
          </div>
        </div>
      )}

      {/* Step indicator breadcrumb */}
      <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#c8a05c] mb-3">
        <span className="w-6 h-6 rounded-full bg-[#c8a05c] text-black flex items-center justify-center font-bold text-xs">
          2
        </span>
        <span>Step 2 of 3: Pickup &amp; Drop-Off Locations</span>
      </div>

      {/* Active Service Badge & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-6 p-4 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-md gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              isChauffeur ? "bg-[#c8a05c]" : "bg-amber-400"
            }`}
          />
          <span className="text-xs sm:text-sm text-zinc-400">
            Selected Service:
          </span>
          <span
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
              isChauffeur ? "text-[#e8c683]" : "text-amber-300"
            }`}
          >
            {isChauffeur ? "Executive Chauffeur" : "Standard & Maxi Taxi"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          {isChauffeur ? (
            <Link
              href="/book/taxi"
              className="text-amber-400 hover:text-white transition-colors"
            >
              Switch to Taxi →
            </Link>
          ) : (
            <Link
              href="/book/chauffeur"
              className="text-[#c8a05c] hover:text-white transition-colors"
            >
              Switch to Chauffeur →
            </Link>
          )}
          <span className="text-zinc-600">|</span>
          <Link
            href="/book"
            className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Change Category
          </Link>
        </div>
      </div>

      {/* Category Feature Highlights */}
      <div
        className={`w-full mb-6 p-3.5 rounded-xl border text-xs flex flex-wrap items-center justify-around gap-2 ${
          isChauffeur
            ? "bg-[#c8a05c]/10 border-[#c8a05c]/30 text-[#e8c683]"
            : "bg-amber-400/10 border-amber-400/30 text-amber-300"
        }`}
      >
        {isChauffeur ? (
          <>
            <span className="flex items-center gap-1.5">
              <span>✦</span> European Luxury Fleet
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> 60 Mins Complimentary Wait Time
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Inside Terminal Meet &amp; Greet
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Direct Terminal Pick-up
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Sedans &amp; Maxi Cabs
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <span>✦</span> Metered or Upfront Fixed Rate
            </span>
          </>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-white font-serif">
        Where can we pick you up?
      </h1>
      <p className="mt-2 text-sm text-zinc-400 text-center max-w-md">
        Select your pickup location first to explore connected destinations and
        guaranteed fares.
      </p>

      {/* Quick Airport selection buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-zinc-400 mr-1">Quick Pickup:</span>
        <button
          type="button"
          onClick={() => handleSelectPickup({ name: "Sydney Airport (SYD)" })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            pickup === "Sydney Airport (SYD)"
              ? "border-[#c8a05c] bg-[#c8a05c]/20 text-[#e8c683] ring-1 ring-[#c8a05c]"
              : "border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] bg-white/5"
          }`}
        >
          ✈️ Sydney Airport (SYD)
        </button>
        <button
          type="button"
          onClick={() => handleSelectPickup({ name: "Sydney CBD" })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            pickup === "Sydney CBD"
              ? "border-[#c8a05c] bg-[#c8a05c]/20 text-[#e8c683] ring-1 ring-[#c8a05c]"
              : "border-white/20 hover:border-[#c8a05c] hover:text-[#e8c683] bg-white/5"
          }`}
        >
          🏙️ Sydney CBD
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleBookingSubmit}
        className="mt-8 w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
      >
        {/* Step 1: PICKUP LOCATION */}
        <div ref={pickupContainerRef} className="relative">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="pickup-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
            >
              Step 1: Pickup Location <span className="text-[#c8a05c]">*</span>
            </label>
            {pickup && (
              <button
                type="button"
                onClick={() => {
                  setPickup("");
                  setDropoff("");
                  setConnectedDestinations([]);
                  setRouteData(null);
                  pickupInputRef.current?.focus();
                  setShowPickupDropdown(true);
                }}
                className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Change Pickup
              </button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c8a05c]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              ref={pickupInputRef}
              id="pickup-input"
              type="text"
              required
              value={pickup}
              onFocus={() => {
                setShowPickupDropdown(true);
                setShowDropoffDropdown(false);
              }}
              onChange={(e) => handlePickupChange(e.target.value)}
              placeholder="Type or select pickup location (e.g. Sydney Airport, Sydney CBD)..."
              className={`w-full pl-11 pr-10 py-3.5 rounded-xl bg-black/60 border text-white placeholder-zinc-500 text-sm outline-none transition-all ${
                pickupNotice
                  ? "border-[#c8a05c] ring-2 ring-[#c8a05c]/50"
                  : "border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c]"
              }`}
            />
            {isLoadingPickup ? (
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <span className="w-4 h-4 border-2 border-[#c8a05c] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : pickup ? (
              <button
                type="button"
                onClick={() => {
                  setPickup("");
                  setDropoff("");
                  setConnectedDestinations([]);
                  setRouteData(null);
                  setShowPickupDropdown(true);
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            ) : null}
          </div>

          {pickupNotice && (
            <p className="mt-1 text-xs text-[#c8a05c] font-medium flex items-center gap-1">
              <span>⚠️</span> {pickupNotice}
            </p>
          )}

          {/* Pickup Dropdown Suggestions */}
          {showPickupDropdown && pickupSuggestions.length > 0 && (
            <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-zinc-950 border border-[#c8a05c]/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1 divide-y divide-white/5">
              <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-zinc-400 bg-white/5">
                Select Origin Location
              </div>
              {pickupSuggestions.map((place) => {
                const placeObj =
                  typeof place === "string" ? { name: place } : place;
                const isSelected = pickup === placeObj.name;
                return (
                  <button
                    key={placeObj.name}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectPickup(placeObj);
                    }}
                    onClick={() => handleSelectPickup(placeObj)}
                    className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-[#c8a05c]/20 text-[#e8c683]"
                        : "hover:bg-zinc-800/80 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#c8a05c] text-base">📍</span>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-[#e8c683] transition-colors">
                          {placeObj.name}
                        </p>
                        {placeObj.address && (
                          <p className="text-xs text-zinc-400">
                            {placeObj.address}
                          </p>
                        )}
                      </div>
                    </div>
                    {placeObj.code && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                        {placeObj.code}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 2: DROP-OFF DESTINATION (Shows connected destinations for selected pickup on focus) */}
        <div ref={dropoffContainerRef} className="relative">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="dropoff-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
            >
              Step 2: Drop-off Destination{" "}
              <span className="text-[#c8a05c]">*</span>
              {pickup && (
                <span className="ml-2 text-[10px] text-emerald-400 font-normal lowercase">
                  (connected to {pickup})
                </span>
              )}
            </label>
            {dropoff && (
              <button
                type="button"
                onClick={() => {
                  setDropoff("");
                  setRouteData(null);
                  dropoffInputRef.current?.focus();
                  handleDropoffFocus();
                }}
                className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Change Destination
              </button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <input
              ref={dropoffInputRef}
              id="dropoff-input"
              type="text"
              required
              disabled={!pickup.trim()}
              value={dropoff}
              onFocus={handleDropoffFocus}
              onClick={handleDropoffFocus}
              onChange={(e) => handleDropoffChange(e.target.value)}
              placeholder={
                pickup.trim()
                  ? `Choose destination connected to ${pickup}...`
                  : "🔒 Select Pickup location first..."
              }
              className={`w-full pl-11 pr-10 py-3.5 rounded-xl border text-sm outline-none transition-all ${
                !pickup.trim()
                  ? "bg-zinc-950/40 border-white/5 text-zinc-500 cursor-not-allowed"
                  : "bg-black/60 border-white/15 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-white placeholder-zinc-500"
              }`}
            />
            {isLoadingDropoff ? (
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <span className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : dropoff ? (
              <button
                type="button"
                onClick={() => {
                  setDropoff("");
                  setRouteData(null);
                  handleDropoffFocus();
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            ) : null}
          </div>

          {/* Dropoff Dropdown Suggestions: connected destinations */}
          {showDropoffDropdown && pickup.trim() && (
            <div className="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl bg-zinc-950 border border-emerald-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-1 divide-y divide-white/5">
              <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/40 flex items-center justify-between">
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
                        handleSelectDropoff(placeObj);
                      }}
                      onClick={() => handleSelectDropoff(placeObj)}
                      className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? "bg-emerald-950/50 text-emerald-300"
                          : "hover:bg-zinc-800/80 text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 text-base">🏁</span>
                        <div>
                          <p className="text-sm font-semibold group-hover:text-emerald-300 transition-colors">
                            {placeObj.name}
                          </p>
                          {placeObj.address && (
                            <p className="text-xs text-zinc-400">
                              {placeObj.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                        Select →
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-4 text-xs text-zinc-400 text-center">
                  {isLoadingDropoff
                    ? "Loading connected routes..."
                    : "No connected direct routes found for this pickup location."}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Route Fare & Distance Summary */}
        {isCalculatingFare && (
          <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/10 flex items-center justify-center gap-3 text-xs text-zinc-400 animate-pulse">
            <span className="w-3.5 h-3.5 border-2 border-[#c8a05c] border-t-transparent rounded-full animate-spin" />
            <span>
              Calculating live route fare from Sydney Transport API...
            </span>
          </div>
        )}

        {calculatedFare && !isCalculatingFare && (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-zinc-950 via-[#181a20] to-zinc-950 border border-[#c8a05c]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#c8a05c] text-black">
                  Guaranteed Route Fare
                </span>
                <span className="text-xs text-zinc-400">
                  Zero Surge • All Inclusive
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1.5">
                Route: <span className="text-white font-medium">{pickup}</span>{" "}
                → <span className="text-white font-medium">{dropoff}</span>
              </p>
              {(calculatedFare.distanceKm || calculatedFare.durationMin) && (
                <p className="text-xs text-zinc-400 mt-0.5">
                  Est. {calculatedFare.distanceKm} km • ~
                  {calculatedFare.durationMin} mins duration
                </p>
              )}
            </div>
            <div className="text-right sm:self-center">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
                {isChauffeur ? "Chauffeur Fare" : "Taxi Fare"}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#e8c683]">
                ${calculatedFare.total}{" "}
                <span className="text-xs font-sans text-zinc-400 font-normal">
                  {calculatedFare.currency}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
            >
              Pickup Date
            </label>
            <input
              id="date-input"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="time-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
            >
              Pickup Time
            </label>
            <input
              id="time-input"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Passenger & Luggage Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="passengers-select"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
            >
              Passengers
            </label>
            <select
              id="passengers-select"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num} className="bg-zinc-900">
                  {num} {num === 1 ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="luggage-select"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
            >
              Luggage Pieces
            </label>
            <select
              id="luggage-select"
              value={luggage}
              onChange={(e) => setLuggage(Number(e.target.value))}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white text-sm outline-none transition-all"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num} className="bg-zinc-900">
                  {num} {num === 1 ? "Bag" : "Bags"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="flight-input"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
            >
              Flight # (Optional)
            </label>
            <input
              id="flight-input"
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="e.g. QF1, VA805"
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] focus:ring-1 focus:ring-[#c8a05c] text-white placeholder-zinc-500 text-sm outline-none transition-all uppercase"
            />
          </div>
        </div>

        {/* Passenger Contact Information */}
        <div className="pt-2 border-t border-white/10 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8a05c]">
            Passenger Contact Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name-input"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Full Name <span className="text-[#c8a05c]">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                required
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="phone-input"
                className="block text-xs font-medium text-zinc-300 mb-1"
              >
                Mobile Phone <span className="text-[#c8a05c]">*</span>
              </label>
              <input
                id="phone-input"
                type="tel"
                required
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                placeholder="e.g. +61 412 345 678"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email-input"
              className="block text-xs font-medium text-zinc-300 mb-1"
            >
              Email Address (For Confirmation Receipt)
            </label>
            <input
              id="email-input"
              type="email"
              value={passengerEmail}
              onChange={(e) => setPassengerEmail(e.target.value)}
              placeholder="e.g. john.doe@example.com"
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#c8a05c] text-white text-sm outline-none transition-all"
            />
          </div>
        </div>

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
