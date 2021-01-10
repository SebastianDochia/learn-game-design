self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('static').then((cache) => {
            return cache.addAll([
                './',
                'index.html',
                './resources/hitSound.mp3',
                './resources/hitSound2.mp3',
                './Styles/Chapters.css',
                './Styles/Title.css',
                './Styles/TableOfContents.css',
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
