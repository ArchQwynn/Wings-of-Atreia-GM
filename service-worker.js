const CACHE_NAME = 'woa-gm-v6';
const APP_SHELL = [
  './', './index.html', './manifest.json', './offline.html',
  './assets/css/style.css', './assets/js/site.js',
  './assets/icons/icon-192.svg', './assets/icons/icon-512.svg',
  './world/', './world/index.html', './world/overview.html', './world/elysea.html', './world/asmodae.html', './world/abyss.html', './world/history.html', './world/factions.html',
  './lords/', './lords/empyrean.html', './lords/dragon.html', './lords/encyclopedia.html', './lords/statblocks.html', './lords/roles.html', './lords/roles/', './lords/roles/index.html', './lords/lord-page.js',
  './lords/empyrean/ariel.html', './lords/empyrean/kaisinel.html', './lords/empyrean/nezekan.html', './lords/empyrean/vaizel.html', './lords/empyrean/yustiel.html', './lords/empyrean/azphel.html', './lords/empyrean/lumiel.html', './lords/empyrean/marchutan.html', './lords/empyrean/triniel.html', './lords/empyrean/zikel.html', './lords/empyrean/israphel.html', './lords/empyrean/siel.html',
  './lords/dragon/fregion.html', './lords/dragon/meslamtaeda.html', './lords/dragon/ereshkigal.html', './lords/dragon/beritra.html', './lords/dragon/tiamat.html', './lords/dragon/apsu.html',
  './monsters/', './npcs/', './tables/', './tables/index.html', './tables/rolls.html', './tables/common-equipment.html', './tables/loot.html', './encounters/', './campaign/', './tools/'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(cached => cached || caches.match('./offline.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    }).catch(() => caches.match('./offline.html')))
  );
});
