const STATIC_CACHE = "pashtuneinstein-static-v2";
const RUNTIME_CACHE = "pashtuneinstein-runtime-v2";
const APP_SHELL = [
  "/",
  "/index.html",
  "/academy/",
  "/about/",
  "/ai/",
  "/aijobchecker/",
  "/comm1/",
  "/encryptdoc/",
  "/language_tutor/",
  "/privacy_policy/",
  "/quiz/",
  "/webscience/",
  "/manifest.json",
  "/pwa.js",
  "/icon.svg",
  "/logo.png",
  "/logo.webp",
  "/bg.webp",
  "/mypic.webp"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== STATIC_CACHE && key !== RUNTIME_CACHE;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(function (cache) {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match(event.request).then(function (cachedPage) {
            return cachedPage || caches.match("/") || caches.match("/index.html");
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      const networkFetch = fetch(event.request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then(function (cache) {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(function () {
          return cachedResponse;
        });

      return cachedResponse || networkFetch;
    })
  );
});
