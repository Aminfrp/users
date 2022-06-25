self.addEventListener("install",(e)=>{
  // call back install
  console.log({"install":e})
  // caching the page
  return e.waitUntil(
    caches.open("front").then((cache)=> {
      cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css')
      cache.add('/')
      cache.add('https://reqres.in/img/faces/1-image.jpg')
      cache.add('https://reqres.in/img/faces/2-image.jpg')
      cache.add('https://reqres.in/img/faces/3-image.jpg')
      cache.add('https://reqres.in/img/faces/4-image.jpg')
      cache.add('https://reqres.in/img/faces/5-image.jpg')
      cache.add('https://reqres.in/img/faces/6-image.jpg')
    })
    )
})

self.addEventListener("activate",(e)=>{
  // call back activate
  console.log({"activate":e})
})

self.addEventListener('fetch',(e) => {
  return e.respondWith(
    caches.open("front").then((cache)=>{
      return cache.match(e.request).then(res=>{
        return res || fetch(e.request)
      })
    })
  )
});
