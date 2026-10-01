const CACHE_NAME = 'woa-gm-v2';
const APP_SHELL = [
  './', './index.html', './manifest.json', './offline.html', './assets/css/style.css', './assets/js/site.js', './assets/icons/icon.svg',
  './world/', './world/index.html', './world/overview.html', './world/elysea.html', './world/asmodae.html', './world/abyss.html', './world/history.html', './world/factions.html',
  './lords/', './monsters/', './npcs/', './tables/', './encounters/', './campaign/', './tools/'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const request = event.request; const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(c=>c.put(request,copy)); return response; }).catch(() => caches.match(request).then(c => c || caches.match('./offline.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(c => c || fetch(request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(request,copy)); return response; }).catch(() => caches.match('./offline.html'))));
});