const CACHE='shake-builder-v02';
const FILES=['./','./index.html','./app.js','./import-core.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./data/backup-rezepte.json','./data/produktdatenbank.json','./data/formula-matrix-1.1.json','./data/recovery-matrix-2.9.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shake-builder-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==location.origin||!FILES.some(f=>new URL(f,self.registration.scope).href===url.href))return;e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request))||fetch(e.request)));});
