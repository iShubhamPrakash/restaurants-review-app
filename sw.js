/*
Author:
Shubham Prakash
email: shubham.prakash2308@gmail.com
github: @i-shubhamprakash
*/

// Save the files in the cache for offline access
let currentCacheVersion = 'cacheV1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentCacheVersion).then(cache => {
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
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            //if request matches the resources in the cache, return it
            // if request does NOT matches the resources in the cache, make a new request and cache it also
            return resp || fetch(event.request).then(function (response) {
                return caches.open(currentCacheVersion).then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});