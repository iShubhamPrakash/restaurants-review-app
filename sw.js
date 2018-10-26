// Save the files in the cache for offline access
let currentVersion = 'cacheV1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentVersion).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js'
            ])
        }).catch(err => console.log("Couldn't cache " + err))
    );
});


// hijacking request and responding with resources from the cache if available

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; //if request matches the resources in the cache, return it
            }

            return fetch(event.request);  // if request does NOT matches the resources in the cache, make a new request
        })
    );
});
