/* Service Worker: macht die App installierbar und offline nutzbar.
 * Strategie „Netzwerk zuerst“: Online kommen immer die neuesten Karten,
 * offline wird die zuletzt geladene Version aus dem Cache verwendet.
 */
const CACHE = 'karteikarten-v12';
const CDN = 'cdnjs.cloudflare.com';
const SHELL = [
  './', 'index.html', 'style.css', 'app.js', 'decks.js', 'decks/schaltungstheorie.js', 'decks/computertechnik.js', 'decks/lineare-algebra.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  // KaTeX (Skript, CSS, Schriften) vom CDN: versioniert, daher Cache zuerst → Formeln auch offline
  if (url.host === CDN) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }))
    );
    return;
  }
  if (url.origin !== location.origin) return;

  // Cache-Schlüssel ohne ?v=… (die App hängt einen Zeitstempel an, um immer frisch zu laden)
  const key = req.mode === 'navigate' ? new URL('./', location).href : url.origin + url.pathname;

  e.respondWith(
    // no-cache: beim Server nachfragen (ETag), damit nie eine veraltete Datei aus dem HTTP-Cache kommt
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
        return res;
      })
      .catch(() => caches.match(key).then(r => r || caches.match('index.html')))
  );
});
