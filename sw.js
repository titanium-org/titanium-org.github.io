async function addResourcesToCache(resources) {
  const cache = await caches.open("v2");
  console.log(cache)
  cache.addAll(resources);
}
async function putInCache(request, response) {
  const cache = await caches.open("v2");
  cache.put(request, response);
}
async function cacheFirst(request, fallbackURL) {
  const responseFromCache = await caches.match(request);
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
  self.addEventListener("activate", async (e) => {
    const cacheKeepList = ["v2"];
    const cacheAllList = await caches.keys();
    const cacheDeleteList = cacheAllList.filter(e => !cacheKeepList.includes(e));
    for (let c of cacheDeleteList) {
      await caches.delete(c);
    }
  });
