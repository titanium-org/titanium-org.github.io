async function addResourcesToCache(resources) {
  const cache = caches.open("attendance-2");
  cache.addAll(resources);
}
self.addEventListener("install", function (e) {
  e.waitUntil(addResourcesToCache([
    "/",
    "index.html",
    "style.css",
    "home-section.html",
    "attendance-tracker-section.css",
    "event-manager-section.css",
    "app.js",
    "ss-jost-normal.woff2",
    "font.css",
    "icon-font.woff2",
    "icons.css"
  ]));
});
async function putInCache(request, response) {
  const cache = caches.open("v1");
  await cache.put(request, response);
}
async function cacheFirst(request, fallbackURL) {
  const responseFromeCache = caches.match(request);
  if (responseFromCache) return responseFromCache;
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  }
  catch (err) {
    const fallbackResponse = await caches.match(fallbackURL);
    if (fallbackResponse) return fallbackResponse;
    return new Response(("Network Error Occured"), {
      status: 408,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
}
self.addEventListener("fetch", function (e) {
  e.respondWith(cacheFirst(e.request, "/fallback.html"));
});