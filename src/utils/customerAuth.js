// Passenger / Customer Authentication and Storage Utilities

const TOKEN_KEY = "syd_customer_token";
const USER_KEY = "syd_customer_user";
const RECENT_BOOKINGS_KEY = "syd_customer_local_bookings";

// Default mock user profile when testing offline without backend
export const DEFAULT_MOCK_USER = {
  id: "cust_demo_01",
  fullName: "Alexander Wright",
  email: "alexander.wright@sydney.com.au",
  phone: "+61 404 123 456",
  role: "passenger",
  preferences: {
    defaultPassengers: 2,
    defaultLuggage: 2,
    preferredVehicleType: "Chauffeur",
    favoritePlaces: [
      { label: "Home", address: "Manly, NSW" },
      { label: "Head Office", address: "Sydney CBD" },
      { label: "Sydney Airport (SYD)", address: "Sydney Airport (SYD)" },
    ],
  },
};

// Initial sample bookings for rich portal preview
export const INITIAL_MOCK_BOOKINGS = [
  {
    id: "bk_101",
    bookingNumber: "SYD-K9J4M2",
    vehicleType: "Chauffeur",
    pickup: "Sydney Airport (SYD)",
    dropoff: "Sydney CBD",
    pickupTime: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), // 3 hours from now
    passengers: 2,
    luggage: 2,
    flightNumber: "QF402",
    fare: { total: 115, currency: "AUD" },
    status: "on_the_way",
    paymentStatus: "paid",
    driverInfo: {
      driverName: "Marcus Sterling",
      driverPhone: "+61 412 888 999",
      vehicleMakeModel: "Mercedes-Benz S-Class (Black)",
      licensePlate: "SYD-CH88",
      etaMinutes: 14,
      currentLocation: "接近 Mascot / Airport Drive",
    },
    notes: "VIP Client. Meet inside Terminal 1 Arrivals with nameboard.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "bk_102",
    bookingNumber: "SYD-8F2N9X",
    vehicleType: "Chauffeur",
    pickup: "Sydney CBD",
    dropoff: "Bondi Beach",
    pickupTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days later
    passengers: 1,
    luggage: 1,
    flightNumber: "",
    fare: { total: 85, currency: "AUD" },
    status: "confirmed",
    paymentStatus: "cash_to_driver",
    driverInfo: null,
    notes: "Pick up at hotel lobby.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "bk_103",
    bookingNumber: "SYD-3T7Q1A",
    vehicleType: "Taxi",
    pickup: "Parramatta",
    dropoff: "Sydney Airport (SYD)",
    pickupTime: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    passengers: 3,
    luggage: 4,
    flightNumber: "VA815",
    fare: { total: 145, currency: "AUD" },
    status: "completed",
    paymentStatus: "paid",
    driverInfo: {
      driverName: "James Henderson",
      driverPhone: "+61 400 333 444",
      vehicleMakeModel: "Maxi Taxi Van",
      licensePlate: "TX-4401",
    },
    notes: "Luggage assistance required.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];

/**
 * Get current customer session from localStorage
 */
export function getStoredCustomer() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Get customer auth token
 */
export function getStoredToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch (e) {
    return null;
  }
}

/**
 * Save customer session
 */
export function saveCustomerSession(token, user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("syd_customer_auth_changed"));
  } catch (e) {
    console.error("Failed to save customer session", e);
  }
}

/**
 * Clear customer session (Logout)
 */
export function clearCustomerSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("syd_customer_auth_changed"));
  } catch (e) {
    console.error("Failed to clear customer session", e);
  }
}

/**
 * Get customer bookings from localStorage or initialize with seed data
 */
export function getCustomerBookings() {
  if (typeof window === "undefined") return INITIAL_MOCK_BOOKINGS;
  try {
    const raw = localStorage.getItem(RECENT_BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(RECENT_BOOKINGS_KEY, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MOCK_BOOKINGS;
  }
}

/**
 * Add or update a booking in local storage
 */
export function saveCustomerBooking(booking) {
  if (typeof window === "undefined") return;
  try {
    const current = getCustomerBookings();
    const index = current.findIndex(
      (b) => b.bookingNumber === booking.bookingNumber || b.id === booking.id
    );

    let updated;
    if (index >= 0) {
      updated = [...current];
      updated[index] = { ...updated[index], ...booking };
    } else {
      updated = [booking, ...current];
    }

    localStorage.setItem(RECENT_BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("syd_customer_bookings_changed"));
    return updated;
  } catch (e) {
    console.error("Failed to save booking locally", e);
  }
}

