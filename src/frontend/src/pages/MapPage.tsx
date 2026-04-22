import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { useMockData } from "@/hooks/useMockData";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import type { Store } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  Clock,
  ExternalLink,
  Filter,
  List,
  Map as MapIcon,
  MapPin,
  Navigation,
  Phone,
  Search,
  X,
} from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface StoreWithDistance extends Store {
  distance: string;
}

type ViewMode = "map" | "list";

// ─── Constants ─────────────────────────────────────────────────────────────────

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

const MAPBOX_STYLE_DARK = "mapbox://styles/mapbox/dark-v11" as const;
const MAPBOX_STYLE_LIGHT = "mapbox://styles/mapbox/light-v11" as const;

const MOCK_DISTANCES: Record<string, string> = {
  "store-001": "2.3 km",
  "store-002": "3.8 km",
  "store-003": "1.1 km",
  "store-004": "4.5 km",
  "store-005": "0.8 km",
  "store-006": "2.1 km",
  "store-007": "5.2 km",
  "store-008": "3.3 km",
};

const STORE_SCHEDULE: Record<string, { days: string; hours: string }[]> = {
  "store-001": [
    { days: "Lun–Sáb / Mon–Sat", hours: "9:00 – 20:00" },
    { days: "Dom / Sun", hours: "Cerrado / Closed" },
  ],
  "store-002": [{ days: "Todos / Every day", hours: "8:00 – 22:00" }],
  "store-003": [
    { days: "Lun–Vie / Mon–Fri", hours: "10:00 – 18:00" },
    { days: "Sáb–Dom / Sat–Sun", hours: "Cerrado / Closed" },
  ],
  "store-004": [{ days: "Lun–Dom / Every day", hours: "9:00 – 21:00" }],
  "store-005": [
    { days: "Lun–Sáb / Mon–Sat", hours: "8:00 – 19:00" },
    { days: "Dom / Sun", hours: "10:00 – 15:00" },
  ],
  "store-006": [{ days: "Lun–Dom / Every day", hours: "10:00 – 20:00" }],
  "store-007": [
    { days: "Lun–Sáb / Mon–Sat", hours: "9:00 – 21:00" },
    { days: "Dom / Sun", hours: "Cerrado / Closed" },
  ],
  "store-008": [{ days: "Lun–Dom / Every day", hours: "9:00 – 22:00" }],
};

// ─── Mapbox Map View ───────────────────────────────────────────────────────────

interface MapboxViewProps {
  stores: StoreWithDistance[];
  selectedStore: StoreWithDistance | null;
  userLocation: { lat: number; lng: number } | null;
  onSelectStore: (store: StoreWithDistance) => void;
  onRequestLocation: () => void;
  t: (es: string, en: string) => string;
  isLocating: boolean;
}

function MapboxView({
  stores,
  selectedStore,
  userLocation,
  onSelectStore,
  onRequestLocation,
  t,
  isLocating,
}: MapboxViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const skipNextThemeStyleSync = useRef(true);

  const { isDark } = useTheme();
  const mapStyleUrl = isDark ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;

  /** Captured on first mount so the map is created once with the correct light/dark basemap */
  const [mapStyleOnMount] = useState<"dark" | "light">(() =>
    isDark ? "dark" : "light",
  );
  const styleAtMount =
    mapStyleOnMount === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: styleAtMount,
      center: [-80, -5],
      zoom: 2.5,
      attributionControl: false,
    });

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left",
    );
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    mapRef.current = map;

    return () => {
      // Cleanup markers
      for (const marker of markersRef.current.values()) {
        marker.remove();
      }
      markersRef.current.clear();
      userMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [styleAtMount]);

  // When app theme changes (día / noche), swap Mapbox basemap without remounting the map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (skipNextThemeStyleSync.current) {
      skipNextThemeStyleSync.current = false;
      return;
    }
    map.setStyle(mapStyleUrl);
  }, [mapStyleUrl]);

  // Snapshot initial stores list for the one-time fit-bounds on mount
  const initialStoresRef = useRef(stores);

  // Fit bounds to stores on first load
  useEffect(() => {
    const map = mapRef.current;
    const initialStores = initialStoresRef.current;
    if (!map || initialStores.length === 0) return;

    const handler = () => {
      if (initialStores.length === 1) {
        map.flyTo({
          center: [initialStores[0].lng, initialStores[0].lat],
          zoom: 12,
        });
        return;
      }

      const bounds = new mapboxgl.LngLatBounds();
      for (const store of initialStores) {
        bounds.extend([store.lng, store.lat]);
      }
      map.fitBounds(bounds, { padding: 80, maxZoom: 9, duration: 1200 });
    };

    if (map.loaded()) {
      handler();
    } else {
      map.once("load", handler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  // Sync store markers whenever stores list changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const addMarkers = () => {
      // Remove old markers that are no longer in stores
      const currentIds = new Set(stores.map((s) => s.id));
      for (const [id, marker] of markersRef.current.entries()) {
        if (!currentIds.has(id)) {
          marker.remove();
          markersRef.current.delete(id);
        }
      }

      // Add / update markers
      for (const store of stores) {
        if (markersRef.current.has(store.id)) continue;

        const el = createStoreMarkerElement(store, false);
        el.addEventListener("click", () => onSelectStore(store));

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([store.lng, store.lat])
          .addTo(map);

        markersRef.current.set(store.id, marker);
      }
    };

    if (map.loaded()) {
      addMarkers();
    } else {
      map.once("load", addMarkers);
    }
  }, [stores, onSelectStore]);

  // Highlight selected store marker
  useEffect(() => {
    for (const [id, marker] of markersRef.current.entries()) {
      const store = stores.find((s) => s.id === id);
      if (!store) continue;
      const el = marker.getElement();
      const isSelected = selectedStore?.id === id;
      updateMarkerStyle(el, store, isSelected);
    }
  }, [selectedStore, stores]);

  // Fly to selected store
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedStore) return;
    map.flyTo({
      center: [selectedStore.lng, selectedStore.lat],
      zoom: 13,
      duration: 900,
      offset: [0, -80],
    });
  }, [selectedStore]);

  // User location marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;

    const addUserMarker = () => {
      userMarkerRef.current?.remove();

      const el = document.createElement("div");
      el.className = "mapbox-user-marker";
      el.innerHTML = `
        <div style="
          width:18px;height:18px;border-radius:50%;
          background:oklch(0.68 0.2 160);
          border:3px solid white;
          box-shadow:0 0 0 4px oklch(0.68 0.2 160 / 0.3), 0 0 16px oklch(0.68 0.2 160 / 0.5);
          position:relative;
        ">
          <div style="
            position:absolute;inset:-6px;border-radius:50%;
            border:2px solid oklch(0.68 0.2 160 / 0.4);
            animation:mapboxUserPing 2s ease-in-out infinite;
          "></div>
        </div>
      `;

      userMarkerRef.current = new mapboxgl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map);
    };

    if (map.loaded()) {
      addUserMarker();
    } else {
      map.once("load", addUserMarker);
    }
  }, [userLocation]);

  // No token fallback
  if (!MAPBOX_TOKEN) {
    return (
      <div
        className="relative rounded-3xl overflow-hidden border border-border flex flex-col items-center justify-center gap-4 bg-card"
        style={{ height: "360px" }}
        data-ocid="map.canvas_target"
      >
        <span className="text-4xl opacity-40">🗺️</span>
        <div className="text-center px-6">
          <p className="font-display text-base font-semibold text-foreground mb-1">
            {t("Token de Mapbox requerido", "Mapbox token required")}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            {t(
              "Define VITE_MAPBOX_TOKEN en tu archivo .env para activar el mapa",
              "Set VITE_MAPBOX_TOKEN in your .env file to enable the map",
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-border"
      style={{ height: "360px" }}
      data-ocid="map.canvas_target"
    >
      {/* Mapbox container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Custom ping animation */}
      <style>{`
        @keyframes mapboxUserPing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* Legend overlay */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10 bg-card/70 backdrop-blur-sm rounded-xl px-2.5 py-2 border border-border/40">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary/90 shadow-sm" />
          <span className="text-[9px] font-mono text-primary/80">
            {t("Abierto", "Open")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
          <span className="text-[9px] font-mono text-muted-foreground/60">
            {t("Cerrado", "Closed")}
          </span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary/90" />
            <span className="text-[9px] font-mono text-secondary/70">
              {t("Tú", "You")}
            </span>
          </div>
        )}
      </div>

      {/* Location button */}
      <button
        type="button"
        onClick={onRequestLocation}
        disabled={isLocating}
        aria-label={t("Usar mi ubicación", "Use my location")}
        data-ocid="map.use_location_button"
        className={cn(
          "absolute bottom-3 right-14 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-body font-medium transition-smooth z-10",
          "bg-card/80 backdrop-blur border-border hover:border-secondary/60 hover:text-secondary",
          "text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isLocating && "animate-pulse",
        )}
      >
        <Navigation
          size={11}
          className={userLocation ? "text-secondary" : ""}
        />
        {isLocating
          ? t("Localizando…", "Locating…")
          : userLocation
            ? t("Tu ubicación ✓", "Your location ✓")
            : t("Usar mi ubicación", "Use my location")}
      </button>
    </div>
  );
}

// ─── Marker helpers ────────────────────────────────────────────────────────────

function createStoreMarkerElement(
  store: StoreWithDistance,
  isSelected: boolean,
): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText =
    "cursor:pointer;display:flex;flex-direction:column;align-items:center;";

  const pinColor = isSelected
    ? "oklch(0.78 0.18 75)"
    : store.isOpen
      ? "oklch(0.78 0.18 75 / 0.85)"
      : "oklch(0.5 0.02 200 / 0.6)";

  const borderColor = isSelected
    ? "oklch(0.78 0.18 75)"
    : store.isOpen
      ? "oklch(0.78 0.18 75 / 0.5)"
      : "oklch(0.5 0.02 200 / 0.3)";

  const scale = isSelected ? "scale(1.3)" : "scale(1)";
  const glow = isSelected
    ? "drop-shadow(0 0 8px oklch(0.78 0.18 75 / 0.8))"
    : store.isOpen
      ? "drop-shadow(0 0 4px oklch(0.78 0.18 75 / 0.4))"
      : "none";

  el.innerHTML = `
    <div style="
      position:relative;display:flex;flex-direction:column;align-items:center;
      transform:${scale};transition:transform 0.2s;filter:${glow};
    ">
      <div style="
        width:28px;height:28px;border-radius:50%;border:2px solid ${borderColor};
        background:${pinColor};display:flex;align-items:center;justify-content:center;
        font-size:13px;line-height:1;box-shadow:0 2px 8px rgba(0,0,0,0.4);
      ">🎟</div>
      <div style="
        width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;
        border-top:5px solid ${pinColor};
      "></div>
    </div>
  `;
  return el;
}

function updateMarkerStyle(
  el: HTMLElement,
  store: StoreWithDistance,
  isSelected: boolean,
): void {
  const pinColor = isSelected
    ? "oklch(0.78 0.18 75)"
    : store.isOpen
      ? "oklch(0.78 0.18 75 / 0.85)"
      : "oklch(0.5 0.02 200 / 0.6)";

  const borderColor = isSelected
    ? "oklch(0.78 0.18 75)"
    : store.isOpen
      ? "oklch(0.78 0.18 75 / 0.5)"
      : "oklch(0.5 0.02 200 / 0.3)";

  const scale = isSelected ? "scale(1.3)" : "scale(1)";
  const glow = isSelected
    ? "drop-shadow(0 0 8px oklch(0.78 0.18 75 / 0.8))"
    : store.isOpen
      ? "drop-shadow(0 0 4px oklch(0.78 0.18 75 / 0.4))"
      : "none";

  const inner = el.querySelector<HTMLElement>("div > div:first-child");
  const triangle = el.querySelector<HTMLElement>("div > div:last-child");

  if (inner) {
    inner.style.transform = scale;
    inner.style.filter = glow;

    const circle = inner.querySelector<HTMLElement>("div");
    if (circle) {
      circle.style.background = pinColor;
      circle.style.borderColor = borderColor;
    }
  }

  if (triangle) {
    triangle.style.borderTopColor = pinColor;
  }
}

// ─── Store Detail Drawer ───────────────────────────────────────────────────────

interface StoreDrawerProps {
  store: StoreWithDistance | null;
  onClose: () => void;
  t: (es: string, en: string) => string;
}

function StoreDrawer({ store, onClose, t }: StoreDrawerProps) {
  const schedule = store
    ? (STORE_SCHEDULE[store.id] ?? [{ days: "—", hours: store.hours }])
    : [];

  const directionsUrl = store
    ? `https://maps.google.com?q=${encodeURIComponent(`${store.address}, ${store.city}, ${store.country}`)}`
    : "#";

  return (
    <AnimatePresence>
      {store && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
            data-ocid="map.store_detail.dialog"
            aria-label={store.name}
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-5 py-4 flex items-start justify-between gap-3 z-10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full shrink-0",
                      store.isOpen
                        ? "bg-secondary glow-green"
                        : "bg-muted-foreground/40",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-body font-medium px-2 py-0.5 rounded-full",
                      store.isOpen
                        ? "bg-secondary/15 text-secondary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {store.isOpen
                      ? t("Abierto", "Open")
                      : t("Cerrado", "Closed")}
                  </span>
                  {store.hasActiveDraw && (
                    <span className="text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      🎟️ {t("Sorteo activo", "Active draw")}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-xl font-bold text-foreground leading-tight truncate">
                  {store.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("Cerrar", "Close")}
                data-ocid="map.store_detail.close_button"
                className="shrink-0 w-9 h-9 rounded-full bg-muted/40 hover:bg-muted flex items-center justify-center transition-smooth text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-5 space-y-5">
              {/* Address */}
              <div className="flex gap-3">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-body mb-0.5">
                    {t("Dirección", "Address")}
                  </p>
                  <p className="text-sm font-body text-foreground leading-snug">
                    {store.address}
                  </p>
                  <p className="text-xs font-body text-muted-foreground">
                    {store.city}, {store.country}
                  </p>
                </div>
              </div>

              {/* Phone */}
              {store.phone && (
                <div className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-body mb-0.5">
                      {t("Teléfono", "Phone")}
                    </p>
                    <a
                      href={`tel:${store.phone}`}
                      className="text-sm font-body text-foreground hover:text-primary transition-smooth"
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              <div className="flex gap-3">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    {t("Horario", "Hours")}
                  </p>
                  <table className="w-full text-xs font-body">
                    <tbody>
                      {schedule.map((row) => (
                        <tr
                          key={row.days}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="py-1.5 text-muted-foreground pr-3 whitespace-nowrap">
                            {row.days}
                          </td>
                          <td className="py-1.5 text-foreground text-right font-medium">
                            {row.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tickets badge */}
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-2xl border",
                  store.hasActiveDraw
                    ? "bg-secondary/8 border-secondary/20"
                    : "bg-muted/30 border-border",
                )}
              >
                <span className="text-xl">🎟️</span>
                <div>
                  <p
                    className={cn(
                      "text-sm font-body font-semibold",
                      store.hasActiveDraw
                        ? "text-secondary"
                        : "text-muted-foreground",
                    )}
                  >
                    {store.hasActiveDraw
                      ? t("Boletos disponibles", "Tickets available")
                      : t("Sin sorteo activo", "No active draw")}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {store.hasActiveDraw
                      ? t(
                          "Sorteo en curso · Compra tu boleto",
                          "Draw in progress · Buy your ticket",
                        )
                      : t(
                          "Próximo sorteo próximamente",
                          "Next draw coming soon",
                        )}
                  </p>
                </div>
              </div>

              {/* Distance */}
              <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                <Navigation size={12} className="text-primary/60" />
                <span>
                  {t("Aprox.", "Approx.")} {store.distance}{" "}
                  {t("de distancia", "away")}
                </span>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="map.store_detail.directions_button"
                >
                  <GlowButton
                    variant="gold"
                    size="md"
                    className="w-full"
                    shimmer
                  >
                    <Navigation size={15} />
                    {t("Cómo llegar", "Get Directions")}
                    <ExternalLink size={12} className="ml-auto opacity-60" />
                  </GlowButton>
                </a>

                <Link to="/pos" data-ocid="map.store_detail.pos_button">
                  <GlowButton variant="green" size="md" className="w-full">
                    <span className="text-base">🖥️</span>
                    {t("Portal POS", "POS Login")}
                  </GlowButton>
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Store List ────────────────────────────────────────────────────────────────

interface StoreListProps {
  stores: StoreWithDistance[];
  selectedStore: StoreWithDistance | null;
  onSelectStore: (store: StoreWithDistance) => void;
  t: (es: string, en: string) => string;
}

function StoreList({
  stores,
  selectedStore,
  onSelectStore,
  t,
}: StoreListProps) {
  if (stores.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-3"
        data-ocid="map.stores.empty_state"
      >
        <span className="text-4xl opacity-40">🗺️</span>
        <p className="font-display text-base text-muted-foreground text-center">
          {t("No hay tiendas en esta región", "No stores in this region")}
        </p>
        <p className="font-body text-xs text-muted-foreground/60 text-center">
          {t(
            "Prueba con otro país o limpia los filtros",
            "Try another country or clear filters",
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="map.stores_list">
      {stores.map((store, i) => (
        <motion.button
          key={store.id}
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "w-full text-left ticket-card bg-card border p-4 cursor-pointer transition-smooth",
            selectedStore?.id === store.id
              ? "border-primary/60 glow-gold"
              : "border-border hover:border-primary/30 hover:bg-card",
          )}
          onClick={() => onSelectStore(store)}
          data-ocid={`map.store_card.${i + 1}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full shrink-0",
                    store.isOpen ? "bg-secondary" : "bg-muted-foreground/40",
                  )}
                />
                <p className="font-display font-semibold text-sm text-foreground truncate">
                  {store.name}
                </p>
              </div>
              <p className="font-body text-xs text-muted-foreground truncate pl-4">
                {store.address}
              </p>
              <div className="flex items-center gap-3 mt-1 pl-4">
                <span className="font-body text-xs text-muted-foreground">
                  {store.city}, {store.country}
                </span>
                <span className="font-mono text-[10px] text-primary/70 bg-primary/8 px-1.5 py-0.5 rounded-md border border-primary/15">
                  {store.distance}
                </span>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end gap-1.5">
              <Badge
                variant={store.isOpen ? "default" : "secondary"}
                className={cn(
                  "text-[10px] px-2 font-body",
                  store.isOpen
                    ? "bg-secondary/15 text-secondary border-secondary/20 hover:bg-secondary/20"
                    : "",
                )}
              >
                {store.isOpen
                  ? t("Disponible", "Available")
                  : t("Cerrado", "Closed")}
              </Badge>
              {store.hasActiveDraw && (
                <span className="text-[10px] text-primary font-body">
                  🎟️ {t("Sorteo", "Draw")}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2.5 pt-2.5 border-t border-border/50">
            <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
              <Clock size={10} />
              {store.hours}
            </span>
            <button
              type="button"
              className="ml-auto text-[10px] font-body text-primary/70 hover:text-primary flex items-center gap-0.5 transition-smooth"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStore(store);
              }}
              data-ocid={`map.view_on_map.${i + 1}`}
            >
              <MapIcon size={10} />
              {t("Ver en mapa", "View on map")}
            </button>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MapPage() {
  const { t } = useLanguage();
  const { stores } = useMockData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos");
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [selectedStore, setSelectedStore] = useState<StoreWithDistance | null>(
    null,
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const countries = [
    "Todos",
    ...Array.from(new Set(stores.map((s) => s.countryCode))),
  ];

  const storesWithDistance: StoreWithDistance[] = stores.map((s) => ({
    ...s,
    distance: MOCK_DISTANCES[s.id] ?? "—",
  }));

  const filtered = storesWithDistance.filter((s) => {
    const matchesCountry =
      selectedCountry === "Todos" || s.countryCode === selectedCountry;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      s.city.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q);
    return matchesCountry && matchesSearch;
  });

  const handleSelectStore = useCallback((store: StoreWithDistance) => {
    setSelectedStore((prev) => (prev?.id === store.id ? null : store));
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedStore(null);
  }, []);

  const handleRequestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error(
        t("Geolocalización no disponible", "Geolocation not available"),
      );
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocating(false);
        toast.success(t("📍 Ubicación encontrada", "📍 Location found"), {
          description: t(
            "Tu posición se muestra en verde en el mapa",
            "Your position is shown in green on the map",
          ),
        });
      },
      () => {
        setIsLocating(false);
        setUserLocation({ lat: 19.43, lng: -99.15 });
        toast.info(t("Usando ubicación de ejemplo", "Using example location"), {
          description: t(
            "Ciudad de México como referencia",
            "Mexico City as reference",
          ),
        });
      },
      { timeout: 8000 },
    );
  }, [t]);

  const handleNotifyToggle = useCallback(() => {
    const next = !notifyEnabled;
    setNotifyEnabled(next);
    if (next) {
      toast.success(t("🔔 Activado", "🔔 Enabled"), {
        description: t(
          "Te avisaremos cuando haya una tienda cerca de ti",
          "We'll notify you when a store is nearby",
        ),
      });
    } else {
      toast(t("🔕 Notificaciones desactivadas", "🔕 Notifications disabled"));
    }
  }, [notifyEnabled, t]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStore(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background" data-ocid="map.page">
      {/* ── Page Header ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border px-4 py-5 sticky top-0 z-30 backdrop-blur"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
                {t("Tiendas físicas", "Physical Stores")}
              </h1>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {filtered.length} {t("tiendas · ", "stores · ")}
                {t(
                  "Boletos disponibles en todo el mundo",
                  "Tickets available worldwide",
                )}
              </p>
            </div>
            {/* View toggle */}
            <div
              className="flex items-center bg-muted/40 rounded-xl border border-border p-1 gap-0.5"
              role="tablist"
              aria-label={t("Vista", "View")}
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "map"}
                onClick={() => setViewMode("map")}
                data-ocid="map.view_map.tab"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth",
                  viewMode === "map"
                    ? "bg-card text-foreground shadow-subtle border border-border"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <MapIcon size={13} />
                {t("Mapa", "Map")}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "list"}
                onClick={() => setViewMode("list")}
                data-ocid="map.view_list.tab"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth",
                  viewMode === "list"
                    ? "bg-card text-foreground shadow-subtle border border-border"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <List size={13} />
                {t("Lista", "List")}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
            />
            <Input
              ref={searchRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                "Buscar ciudad o país…",
                "Search city or country…",
              )}
              className="pl-9 pr-9 bg-muted/30 border-border focus:border-primary/50 font-body text-sm h-10 rounded-xl"
              data-ocid="map.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={t("Limpiar búsqueda", "Clear search")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-smooth"
              >
                <X size={13} />
              </button>
            )}
            <Filter
              size={13}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none"
              style={{ display: searchQuery ? "none" : "block" }}
            />
          </div>

          {/* Country pills */}
          <fieldset
            className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide border-0 p-0 m-0"
            aria-label={t("Filtrar por país", "Filter by country")}
          >
            {countries.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedCountry(code)}
                data-ocid={`map.country_filter.${code.toLowerCase()}`}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-smooth",
                  selectedCountry === code
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
                )}
              >
                {code === "Todos" ? t("Todos", "All") : code}
              </button>
            ))}
          </fieldset>
        </div>
      </motion.div>

      {/* ── Main content ────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <MapboxView
                stores={filtered}
                selectedStore={selectedStore}
                userLocation={userLocation}
                onSelectStore={handleSelectStore}
                onRequestLocation={handleRequestLocation}
                t={t}
                isLocating={isLocating}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <StoreList
                stores={filtered}
                selectedStore={selectedStore}
                onSelectStore={handleSelectStore}
                t={t}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Store list below map */}
        {viewMode === "map" && filtered.length > 0 && (
          <div>
            <p className="font-body text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
              {t("Tiendas en esta región", "Stores in this region")}
            </p>
            <StoreList
              stores={filtered}
              selectedStore={selectedStore}
              onSelectStore={handleSelectStore}
              t={t}
            />
          </div>
        )}

        {/* ── Notify toggle ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "flex items-center justify-between gap-4 p-4 ticket-card border transition-smooth",
            notifyEnabled
              ? "bg-secondary/8 border-secondary/25"
              : "bg-card border-border hover:border-primary/25",
          )}
          data-ocid="map.notify.toggle"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                notifyEnabled ? "bg-secondary/15" : "bg-muted/40",
              )}
            >
              {notifyEnabled ? (
                <Bell size={16} className="text-secondary" />
              ) : (
                <BellOff size={16} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-foreground leading-tight">
                {t(
                  "Avísame cuando haya tienda cerca",
                  "Notify me when a store is nearby",
                )}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {notifyEnabled
                  ? t(
                      "Recibirás alertas de proximidad",
                      "You'll receive proximity alerts",
                    )
                  : t(
                      "Activa para recibir alertas locales",
                      "Enable to get local alerts",
                    )}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={notifyEnabled}
            onClick={handleNotifyToggle}
            data-ocid="map.notify_toggle.switch"
            className={cn(
              "relative shrink-0 w-11 h-6 rounded-full border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              notifyEnabled
                ? "bg-secondary border-secondary/60"
                : "bg-muted border-border",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-smooth",
                notifyEnabled ? "left-[22px]" : "left-0.5",
              )}
            />
            <span className="sr-only">
              {notifyEnabled
                ? t("Desactivar notificaciones", "Disable notifications")
                : t("Activar notificaciones", "Enable notifications")}
            </span>
          </button>
        </motion.div>
      </div>

      {/* ── Store Detail Drawer ──────────────────────────── */}
      <StoreDrawer store={selectedStore} onClose={handleCloseDrawer} t={t} />
    </div>
  );
}
