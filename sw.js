// TiltSphere Service Worker
// Caches the game for offline play

const CACHE_NAME = 'tiltsphere-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.filter(url => !url.includes('.png')));
      // Note: skip icons if they don't exist yet — won't break install
    }).catch(() => {
      return caches.open(CACHE_NAME).then(cache => cache.add('/'));
    })
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for game assets, network-first for everything else
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Cache successful GET responses for game files
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return cached root if available
        return caches.match('/') || new Response('Offline — please reload when connected', {
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
