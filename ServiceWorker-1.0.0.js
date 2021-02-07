	event.respondWith(
		caches.open('umanis-1.0.0').then(cache => {
			return cache.match(event.request).then(response => {
				if (navigator.onLine === false) {
				  return response;
				}
				return  fetch(event.request)
				.then(response => {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});

var urlsToCache = ["pwa.html","pwa-1.0.0.css","logo-umanis-blanc.svg"];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('umanis-1.0.0').then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});