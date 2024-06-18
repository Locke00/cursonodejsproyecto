import {socketServer} from "../../server.js";
import winstonLog from "../utils/logger/index.js";

//para usar este archivo, debo descomentar la siguiente linea y comentarla la correspondiente en server.js
const messages = [];
export default (socket) => {
  //levanto el socketServer. on() recibe 2 parametros. 1 es el msg q envia el cliente, q es connection
  winstonLog.INFO("connected id: " + socket.id);  //el otro es la variable socket. y en esa variable hay muchos datos en los q se encuentra el id
  //q es lo q yo voy a imprimir
  socket.on("user", () => {
    socket.emit("all", messages);
  });
  socket.emit("messages", messages);
  socket.on("new chat", (data) => {
    messages.push(data);
    winstonLog.INFO(JSON.stringify(messages));
    socketServer.emit("all", messages); // con este metodo envio un mensaje a todos los usuarios
  });
};
