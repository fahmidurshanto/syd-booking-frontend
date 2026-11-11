"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PHOTON_BASE = "https://photon.komoot.io/api";

/**
 * Custom hook: Photon (OpenStreetMap) address autocomplete for Australia
 * - No API key required
 * - Debounced (300ms)
 * - Restricted to Australia bounding box
 *
 * @param {string} query - the search input text
 * @returns {{ suggestions: Array, isLoading: boolean, error: string|null }}
 */
export function usePhotonAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const abortRef = useRef(null);

  const search = useCallback((q) => {
    if (!q || q.trim().length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    // Australia bounding box: lon_min, lat_min, lon_max, lat_max
    // 113.338953078,-43.6345972634,153.569469029,-10.6681857235
    const params = new URLSearchParams({
      q: q.trim(),
      limit: 8,
      lang: "en",
      // Bias results toward Australia (Sydney)
      lat: "-33.8688",
      lon: "151.2093",
      // Country filter
      "osm_tag": "place",
    });

    fetch(`${PHOTON_BASE}?${params}`, { signal: abortRef.current.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Photon API error");
        return res.json();
      })
      .then((data) => {
        const features = data?.features || [];

        // Filter to Australia only (country code 'AU')
        const auResults = features.filter((f) => {
          const country = f.properties?.country?.toLowerCase();
          const cc = f.properties?.countrycode?.toLowerCase();
          return cc === "au" || country === "australia";
        });

        const mapped = auResults.map((f) => {
          const p = f.properties;
          const coords = f.geometry?.coordinates; // [lng, lat]

          // Build a human-readable address
          const parts = [
            p.name,
            p.street && p.housenumber ? `${p.housenumber} ${p.street}` : p.street,
            p.suburb || p.district,
            p.city || p.town || p.village,
            p.state,
            p.postcode,
          ]
            .filter(Boolean)
            .filter((v, i, arr) => arr.indexOf(v) === i); // dedupe

          const displayName = parts.slice(0, 3).join(", ");
          const fullAddress = parts.join(", ");

          return {
            name: displayName || p.name || "Unknown",
            fullAddress,
            lat: coords?.[1] ?? null,
            lng: coords?.[0] ?? null,
            type: p.type || p.osm_value || "place",
          };
        });

        // De-duplicate by display name
        const seen = new Set();
        const unique = mapped.filter((r) => {
          if (seen.has(r.name)) return false;
          seen.add(r.name);
          return true;
        });

        setSuggestions(unique);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("[Photon] Search error:", err.message);
          setError("Could not load suggestions");
          setSuggestions([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), 300);
    return () => clearTimeout(timerRef.current);
  }, [query, search]);

  return { suggestions, isLoading, error };
}

