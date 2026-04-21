const CACHE = 'vg-v2026.04';

const STATIC = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/journal.html',
  '/contact.html',
  '/shared/tokens.css',
  '/shared/nav.css',
  '/shared/enhance.css',
  '/shared/article.css',
  '/shared/data.js',
  '/shared/nav.js',
  '/shared/footer.js',
  '/shared/enhance.js',
  '/shared/i18n.js',
  '/shared/journal-article.js',
  '/home.css',
  '/home.js',
  '/projects.css',
  '/projects.js',
  '/project.css',
  '/project.js',
  '/about.css',
  '/favicon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // HTML: network-first, fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets: cache-first
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return res;
      });
    })
  );
});
