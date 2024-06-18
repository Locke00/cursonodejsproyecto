import "dotenv/config.js";
import env from "../../src/utils/env.util.js"   //esto es necesario 
import { expect } from "chai";
import supertest from "supertest";

describe("Testeando Orders API", function () {
  //requester es le q me va a permitir hacer una solicitud, un llamado a un endpoint
  const requester = supertest("http://localhost:" + process.env.PORT + "/api");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvczMuc2Fsc2Vyb0BnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE3MTg2MzI5NzksImV4cCI6MTczNDE4NDk3OX0.LCXce3ud_s21mvGa0Df2GpnB9LkXJMtl4TaUfEuaOvI"
  const order = {
    quantity: "1"   
  }
  const product = {
    title: "product 2",
    photo: "",
    price: 1,
    stock: 2,
  } 
  const user = {
    name: "josel",
    email: "josel23@gmail.com",  
    password: "hola1234",
    verifiedCode : "aaaa",
    role: 1       //para q pueda crear
  };
  let orderId;
  this.timeout(5000);

  before(async ()=>{
    const { body } = await requester.post(`/products`).send(product)
    .set('Cookie', `token=${token}`);
    product.id = body.response._id

    const { _body } = await requester.post("/sessions/register").send(user);
    user.id = _body.response._id
  })

  after(async () => {
    await requester.delete(`/products/${product.id}`)
      .set('Cookie', `token=${token}`);
    await requester.delete("/users/" + user.id)
      .set('Cookie', `token=${token}`);
  })

  it("Crear una orden", async () => {
    order.user_id = user.id;
    order.product_id = product.id;
    const { body } = await requester.post(`/orders`).send(order)
    .set('Cookie', `token=${token}`);
    orderId = body.response._id
    const { statusCode } = body;
    expect(statusCode).to.be.equals(201)
  })
  
  it("Listar ordenes", async () => {
    const { body } = await requester.get(`/orders`)
    .set('Cookie', `token=${token}`);
    expect(Array.isArray(body.response.docs)).to.be.true;
  })

  it("Modificar una orden", async () => {
    const newQuantity = 12
    const { body } = await requester.put(`/orders/${orderId}`).send({quantity: newQuantity})
    .set('Cookie', `token=${token}`);
    expect(body.response.quantity).to.be.equals(newQuantity)
  })

  it("Devuelve una orden", async () => {
    const { body } = await requester.get(`/orders/${orderId}`)
    .set('Cookie', `token=${token}`);
    expect(body.response._id).to.be.equals(orderId)
  })

  it("Borrar una orden", async () => {
    await requester.delete(`/orders/${orderId}`)
    .set('Cookie', `token=${token}`);

    const { body } = await requester.get(`/orders/${orderId}`)
    .set('Cookie', `token=${token}`);
    const { statusCode } = body;

    expect(statusCode).to.be.equals(404)

  })

});
//nosotros debemos generar los entornos para cada endpoint













/*
const user = {
    first_name: "coder",
    email: "coder@coder.com",
    password: "hola1234",
    role: "admin",
  };
  let uid;
  let token = {};
  it("Registro de un usuario co rrectamente", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body, statusCode } = response;
    //console.log(_body);
    uid = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });
  it();

*/