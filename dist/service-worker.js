const CACHE_NAME = "soondool-v14";
let urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/service-worker.js",
    "/scripts/bundle.js",
    "/pages/detail-tim.html",
    "/pages/home.html",
    "/pages/nav.html",
    "/pages/tim-favorit.html",
    "/assets/favicon.ico",
    "/assets/icon.png",
    "/assets/icon-transparent.png",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    const BASE_URL = `https://api.football-data.org/`;

    if (event.request.url.indexOf(BASE_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames){
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus.");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})