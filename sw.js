/**
 * Service Worker for RoamAI PWA Support
 */

const CACHE_NAME = 'roamai-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles/design-tokens.css',
  './styles/base.css',
  './styles/components.css',
  './js/bundle.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
