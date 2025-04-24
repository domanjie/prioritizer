const VERSION = "v1"

const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/assets/index.css",
  "/assets/index.js",
  "/assets/timer-audio-1.mp3",
  "/favicon.svg",
]

const CACHE_NAME = `Prioritizer-${VERSION}`

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      cache.addAll(APP_STATIC_RESOURCES)
    })()
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        })
      )
      await clients.claim()
    })()
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        })
      )
      await clients.claim()
    })()
  )
})
