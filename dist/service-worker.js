importScripts("precache-manifest.bf428a36e905f498d2176212bc313fcf.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const SEVEN_DAYS_IN_SECONDS = 604800; // Jumlah detik dalam 7 hari

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName :'football-data',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: SEVEN_DAYS_IN_SECONDS
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('/assets/'),
    new workbox.strategies.CacheFirst({
        cacheName : 'assets'
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/scripts/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'scripts'
    })
);

self.addEventListener("push", function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        'body': body,
        'icon': 'assets/icon-transparent.png',
        'badge': 'assets/icon-transparent.png',
        'vibrate': [100, 50, 100],
        'data': {
            'dateOfArrival': Date.now(),
            'primaryKey': 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Soondool', options)
    );
});
