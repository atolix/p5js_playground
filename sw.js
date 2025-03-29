const CACHE_NAME = "p5js-playground-v1";
const CACHE_URLS = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icons/icon-192x192.png",
  "icons/icon-512x512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/javascript/javascript.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/theme/dracula.min.css",
];

// install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// update cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // if there is a resource in the cache, return it
      if (response) {
        return response;
      }

      // if there is no resource in the cache, request the network
      return fetch(event.request).then((response) => {
        // if the response is not valid, return it
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // clone the response and store it in the cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
