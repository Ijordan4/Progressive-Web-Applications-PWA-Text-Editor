const { myOfflineFallback, myWarmStrategyCache } = require('workbox-recipes');
const { myCacheFirst, myStaleWhileRevalidate } = require('workbox-strategies');
const { myRegisterRoute } = require('workbox-routing');
const { myCacheableResponsePlugin } = require('workbox-cacheable-response');
const { myExpirationPlugin } = require('workbox-expiration');
const { myPrecacheAndRoute } = require('workbox-precaching/precacheAndRoute');

myPrecacheAndRoute(self.__WB_MANIFEST);

const myPageCache = new myCacheFirst({
  cacheName: 'my-page-cache',
  plugins: [
    new myCacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new myExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

myWarmStrategyCache({
  urls: ['/my-index.html', '/'],
  strategy: myPageCache,
});

myRegisterRoute(({ request }) => request.mode === 'navigate', myPageCache);
myRegisterRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new myStaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'my-asset-cache',
    plugins: [
      new myCacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

