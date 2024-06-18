const selector = document.querySelector("#login");

selector.addEventListener("click", async () => {  //cada click en el boton va a generar ejecutar el cb
  
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    console.log(data);
    const opts = {
      method: "POST", //otras alternativas: PUT, DELETE, etc
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json()
    console.log(response);
    alert(response.response)
    if (response.statusCode === 200) {
      location.replace("/")
      //localStorage.setItem("token", response.token)  //va a setear ese token en el localStorage  // esto lo comento xq voy a guardar el token en las cookies
      //esto lo vemos en el navegador->InspectorDeCodigo->Application->Storage->LocalStorage
    }
          
    //response.session && location.replace("/")   //si existe la sesion, q me redirija hacia la pagina de inicio
  } catch (error) {
    alert(error.message);
  }
});
