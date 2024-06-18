import "dotenv/config.js";
import env from "../../src/utils/env.util.js"   //esto es necesario 
import { expect } from "chai";
import supertest from "supertest";

describe("Testeando Productos API", function() {
  //requester es le q me va a permitir hacer una solicitud, un llamado a un endpoint
  const requester = supertest("http://localhost:" + process.env.PORT + "/api");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvczMuc2Fsc2Vyb0BnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE3MTg2MzI5NzksImV4cCI6MTczNDE4NDk3OX0.LCXce3ud_s21mvGa0Df2GpnB9LkXJMtl4TaUfEuaOvI"
  let productId;
  const product = {
    title: "product 2",
    photo: "",
    price: 1,
    stock: 2,
  } 

  it("Crear un producto", async () => {
    const { body } = await requester.post(`/products`).send(product)
    .set('Cookie', `token=${token}`);
    productId = body.response._id
    const { statusCode } = body;
    expect(statusCode).to.be.equals(201)
  })
  
  it("Listar productos", async () => {
    const { body } = await requester.get(`/products`)
    .set('Cookie', `token=${token}`);
    expect(Array.isArray(body.response.docs)).to.be.true;
  })

  it("Modificar un producto", async () => {
    const newStock = 10
    const { body } = await requester.put(`/products/${productId}`).send({stock: newStock})
    .set('Cookie', `token=${token}`);
    expect(body.response.stock).to.be.equals(newStock)
  })

  it("Devuelve un producto", async () => {
    const { body } = await requester.get(`/products/${productId}`)
    .set('Cookie', `token=${token}`);
    expect(body.response._id).to.be.equals(productId)
  })

  it("Borrar un producto", async () => {
    await requester.delete(`/products/${productId}`)
    .set('Cookie', `token=${token}`);

    const { body } = await requester.get(`/products/${productId}`)
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