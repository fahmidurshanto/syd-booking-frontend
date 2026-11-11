"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function RouteMap({
  pickupCoords,
  dropoffCoords,
  pickupName,
  dropoffName,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import leaflet to prevent Next.js SSR window errors
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Fix default marker icon assets issue in bundlers
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Default center: Sydney
      const defaultCenter = [-33.8688, 151.2093];

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: defaultCenter,
          zoom: 11,
          zoomControl: false,
          attributionControl: false,
        });

        // Standard 100% Free OpenStreetMap tile server (no API key required)
        L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            subdomains: ["a", "b", "c"],
            attribution: '&copy; OpenStreetMap contributors',
          }
        ).addTo(map);

        // Add small zoom control at top right
        L.control.zoom({ position: "topright" }).addTo(map);

        const layerGroup = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        layerGroupRef.current = layerGroup;
      }

      const map = mapInstanceRef.current;
      const layerGroup = layerGroupRef.current;

      if (!map || !layerGroup) return;

      // Clear previous markers & polylines
      layerGroup.clearLayers();

      const hasPickup =
        pickupCoords?.lat != null && pickupCoords?.lng != null;
      const hasDropoff =
        dropoffCoords?.lat != null && dropoffCoords?.lng != null;

      // Custom styled pin icons
      const createCustomIcon = (bgColor, label) =>
        L.divIcon({
          className: "custom-map-marker",
          html: `
            <div style="
              background-color: ${bgColor};
              width: 26px;
              height: 26px;
              border-radius: 50%;
              border: 2.5px solid #ffffff;
              box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: bold;
              color: white;
            ">
              ${label}
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

      const pIcon = createCustomIcon("#0f172a", "P");
      const dIcon = createCustomIcon("#059669", "D");

      const latlngs = [];

      if (hasPickup) {
        const pLatLng = [pickupCoords.lat, pickupCoords.lng];
        latlngs.push(pLatLng);
        L.marker(pLatLng, { icon: pIcon })
          .bindPopup(`<strong>Pick-up:</strong><br/>${pickupName || "Selected"}`)
          .addTo(layerGroup);
      }

      if (hasDropoff) {
        const dLatLng = [dropoffCoords.lat, dropoffCoords.lng];
        latlngs.push(dLatLng);
        L.marker(dLatLng, { icon: dIcon })
          .bindPopup(`<strong>Drop-off:</strong><br/>${dropoffName || "Selected"}`)
          .addTo(layerGroup);
      }

      if (hasPickup && hasDropoff) {
        // Draw dashed route polyline
        const polyline = L.polyline(latlngs, {
          color: "#0f172a",
          weight: 3.5,
          opacity: 0.85,
          dashArray: "6, 8",
        }).addTo(layerGroup);

        // Auto-fit both markers with padding
        map.fitBounds(polyline.getBounds(), {
          padding: [30, 30],
          maxZoom: 14,
        });
      } else if (hasPickup) {
        map.setView(latlngs[0], 13);
      } else if (hasDropoff) {
        map.setView(latlngs[0], 13);
      } else {
        map.setView(defaultCenter, 11);
      }

      // Ensure map tiles redraw nicely
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    });

    return () => {
      isMounted = false;
    };
  }, [pickupCoords, dropoffCoords, pickupName, dropoffName]);

  // Cleanup map instance on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <div ref={mapContainerRef} className="w-full h-full min-h-[160px] z-0" />
    </div>
  );
}

