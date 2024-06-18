import winstonLog from "./src/utils/logger/index.js";

const selectorGoogle = document.querySelector("#googleRegister");
selectorGoogle.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    winstonLog.INFO(reponse)
    //alert(response.message);
    //response.session && location.replace("/");
  } catch (error) {
    alert(error.message);
  }
});