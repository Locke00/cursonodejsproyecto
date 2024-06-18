const selector = document.querySelector("#register");
selector.addEventListener("click", async () => {  //cada click en el boton va a generar ejecutar el cb
  
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      name: document.querySelector("#name").value,
      lastName: document.querySelector("#lastName").value,
      photo: document.querySelector("#photo").value,
      age: document.querySelector("#age").value
    };
    console.log(data);
    const opts = {
      method: "POST", //otras alternativas: PUT, DELETE, etc
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json()
    console.log(response);
    if (response.statusCode === 201){
      alert("Usuario creado")
      location.replace("/auth/login")
    } else {
      alert("ERROR: " + response.message);
    }
       
    //console.log(response);
    //alert(response.message)
    //location.replace("/sessions/login")   //si existe la sesion, q me redirija hacia la pagina de inicio
    //en la linea de arriba se deberia redirigir a login si se registro con exito, pero hay q completar para q funcione bien, xq la linea de arriba no hace esa verificacion
  } catch (error) {
    alert(error.message);
  }
});


