const CAHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html'] //will need to add and offline html

const self = this

//install SW

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CAHE_NAME).then(cache => {
      console.log('opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

//listen for requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'))
      //we need and offline.html; basiclly a bunch of promises -> always responds with new data -> or if no internet with an offline html
    })
  )
})

//Activate SW
self.addEventListener('activate', event => {
  const cacheWhitelist = []
  cacheWhitelist.push(CAHE_NAME)

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheNames)
          }
        })
      )
    )
  )
})
