const CACHE='lotirchio-survivor-v3-boosts';
const LOCAL=['./','./index.html','./manifest.webmanifest','./hero-run-1.png','./hero-run-2.png','./hero-run-3.png','./hero-run-4.png','./villain-1.png','./villain-2.png','./villain-3.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))))});
