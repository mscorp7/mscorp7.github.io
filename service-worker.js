self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("mscorp-cache").then((cache) => {
            return cache.addAll([
                "https://mscorp7.github.io/",
                "https://mscorp7.github.io/index.html",
                "https://mscorp7.github.io/manifest.json",
                "https://mscorp7.github.io/192pxMS.png",
                "https://mscorp7.github.io/512pxMS.png",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
