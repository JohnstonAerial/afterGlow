// Afterglow service worker
// Strategy:
//   - Open-Meteo API calls (forecast + geocoding): ALWAYS network-first, never
//     served stale. A cached forecast is worse than useless — it's actively
//     wrong. We only fall back to cache if the network request truly fails
//     (e.g. offline), so the app still shows *something* rather than breaking.
//   - Everything else (this app's own files, Leaflet's CDN assets): cache-first,
//     since those don't go stale in a way that matters day-to-day.

const CACHE_NAME = "afterglow-v1";

// Bump this string (v1 -> v2, etc.) any time index.html, manifest.json, or the
// icons change, so returning visitors get the new version instead of a cached
// old one. Leaflet's CDN URLs are version-pinned in the HTML itself, so they
// don't need a cache-name bump when Afterglow's own code changes.
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png"
];

const isApiRequest = (url) =>
  url.hostname === "api.open-meteo.com" ||
  url.hostname === "geocoding-api.open-meteo.com";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => {
        // Don't let a single failed asset (e.g. offline during install) block
        // the whole service worker from installing.
        console.warn("Afterglow SW: precache step had an issue:", err);
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests; let everything else (if any) pass through untouched.
  if (event.request.method !== "GET") return;

  if (isApiRequest(url)) {
    // Network-first: try the network, only fall back to a cached copy if the
    // network request fails outright (e.g. no connectivity). Never treat a
    // cached forecast as good-enough when the network is available.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for the app shell and static libraries (Leaflet CDN files, icons, etc.)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Only cache successful, same-type responses to avoid poisoning the
        // cache with error pages or opaque cross-origin failures.
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
