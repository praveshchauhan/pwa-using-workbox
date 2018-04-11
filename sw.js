importScripts('./node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.1.js');

/* List of all the static files for offline page */
const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './images/offline.jpg',
    './fallback.json'
]

const wb = new WorkboxSW();

wb.precache(staticAssets);
wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, wb.strategies.cacheFirst({
    cacheName: 'news-images',
    cacheExpiration: { maxEntries: 20, maxAgeSeconds: 12 * 60 * 60},
    cacheableResponse: { statuses : [0, 200] }
}));