import winstonLog from "../utils/logger/index.js";

const selector = document.querySelector("#newProduct");
selector.addEventListener("click", async () => {
  try {
    const data = {
      title: document.querySelector("#title").value,
    };
    document.querySelector("#photo").value &&
      (data.photo = document.querySelector("#photo").value);
    document.querySelector("#price").value &&
      (data.price = document.querySelector("#price").value);
    document.querySelector("#stock").value &&
      (data.stock = document.querySelector("#stock").value);

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products", opts);
    response = await response.json();
    winstonLog.INFO(JSON.stringify(response));
    response.statusCode === 201
      ? alert("Product created!")
      : alert("ERROR: "+response.message);
  } catch (error) {
    alert(error.message);
  }
});
