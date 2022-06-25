// create database
var db = new Dexie("users_db");
db.version(1).stores({
    users: "++id",
});
// ckeck if browser support the sw
if("serviceWorker" in navigator){
  // service worker registeration
  navigator.serviceWorker.register("./sw.js").then(()=>{
    console.log("sw registered")
  })
}else{
  console.error("Service worker not supported!");
}


// show banner
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  // show banner
  setTimeout(()=>e.prompt(),5000)

  // user choice
  e.userChoice.then(res=>{
    console.log(res.outcome);
  })
})

// fetch users
const users = document.getElementById("users");
axios({
  method:'get',
  url:"httpsers?page=1"
}).then((response)=>{
  response.data.data.forEach(user=> {
    // set data in db
    db.users.put(user)
  })
  users.innerHTML = response.data.data.map((user) => 
  `<div class="m-2" style="width:18rem;" >
    <div class="card" style="width: 18rem;">
      <img src="${user.avatar}" class="card-img-top" alt="${user.avatar}">
      <div class="card-body">
        <h5 class="card-title">${user.first_name + " " + user.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
      </div>
    </div>
  </div>`
  )
}).then(()=>users.innerHTML = users.innerHTML.replaceAll(",", " ")).catch(()=>{
  // use offline db
  if("indexedDB" in window) db.users.toArray().then((dbUsers)=>{
    users.innerHTML = dbUsers.map((user) => 
    `<div class="m-2" style="width:18rem;" >
      <div class="card" style="width: 18rem;">
        <img src="${user.avatar}" class="card-img-top" alt="${user.avatar}">
        <div class="card-body">
          <h5 class="card-title">${user.first_name + " " + user.last_name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
        </div>
      </div>
    </div>`
    )
  })
})