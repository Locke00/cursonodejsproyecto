//console.log("socket");

const socket = io();


socket.on("welcome", (data) => {
  
//  console.log(data);
});

socket.on("products", (data)=>{
  data = data.map(
    (each) => `
      <div class="card" style="width: 18rem;">
        <img src="${each.photo}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${each.title}</h5>
        </div>
      </div>`
  ).join()
  //console.log(data);
  document.querySelector("#products").innerHTML = data


})



/*socket.on("movies", (data) => {
  
  data = data.map(
    (each) => `
      <div class="card" style="width: 18rem;">
        <img src="${each.poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${each.name}</h5>
        </div>
      </div>`
  ).join()
  console.log(data);
  document.querySelector("#movies").innerHTML = data
});
*/