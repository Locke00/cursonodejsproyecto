import winstonLog from "./src/utils/logger/index.js";

document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json"/*, token */}, //ya no envio estas cookies
        //ya el cookies es parte de los requerimiento. o sea, x defecto se envian en el objeto req
    };
    //ya no necesito enviar el objeto token en el header, ya voy a pasar la info en el objeto cookie
    //el cual se envia x defecto en el objeto req
    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      alert(response.response)
      //localStorage.removeItem("token");  tampoco creo q deberia ir esto ya q no lo estoy guardando en el localStorage
      location.replace("/");
    }
  } catch (error) {
    winstonLog.ERROR(error.message)
  }
});
