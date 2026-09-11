const CACHE_NAME = 'acor-web-v23';
const CORE = [
  './', './index.html', './cases.html', './services.html', './about.html', './team.html', './careers.html', './lab.html', './contact.html', './privacy.html', './offline.html', './404.html', './robots.txt', './sitemap.xml',
  './case-arden.html', './case-greenflow.html', './case-orbit.html', './styles.css', './script.js', './manifest.webmanifest',
  './assets/favicon.svg', './assets/sculpture.jpg', './assets/arden.jpg', './assets/flora.jpg', './assets/team-1.jpg', './assets/team-2.jpg', './assets/team-3.jpg', './assets/team-4.jpg'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('acor-web-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then((response) => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./offline.html'))));
});
