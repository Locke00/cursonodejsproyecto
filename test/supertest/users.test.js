import "dotenv/config.js";
import env from "../../src/utils/env.util.js"   //esto es necesario 
      //para q dotenv capture el entorno
import { expect } from "chai";
import supertest from "supertest";

//import dao from "../../src/data/index.factory.js";
//const { users } = dao;


describe("Testeando Users-Session API", function() {
  //requester es le q me va a permitir hacer una solicitud, un llamado a un endpoint
  const requester = supertest("http://localhost:" + process.env.PORT + "/api");

  const user = {
    name: "josel",
    email: "josel23@gmail.com",  
    password: "hola1234",
    verifiedCode : "aaaa",
    role: 1       //para q pueda crear
  };
  let uid;
  let userCreated;
  let token = {};  //este token lo vamos a setear en el login
  this.timeout(5000);
  it("Registro de un usuario correctamente", async () => {
    const response = await requester.post("/sessions/register").send(user);
    // const response = {
    //   _body: {
    //     response:{
    //       _id:"123"
    //     },
    //     statusCode:201
    //   }
    // }
    
    const { _body } = response;  //response tiene mas propiedades. yo desestructuraré las mas importante
    userCreated = response._body.response
    uid = _body.response._id;  //el uid lo necesito para dsp borrar el usuario creado
    console.log('---creacion-start--');
    console.log(uid);
    console.log('---creacion-end--');
    expect(_body.statusCode).to.be.equals(201);

    // console.log('__aaa__');
    // console.log('__ccc__');
    //console.log({_body, statusCode });   //me devuelve:
    /*  {
          _body: {
            status: 'success',
            payload: {
              _id: '664a611006b0ad42221ba4dd',
              first_name: 'coder',
              avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
              email: 'coder5@coder.com',
              role: 'admin'
            }
          },
          statusCode: 201
        } */

  });
  it("Verificacion de usuario", async()=>{
    const { _body } = await requester.post("/sessions/verify").send({
      email: userCreated.email,
      verifiedCode: userCreated.verifiedCode
    });
    expect(_body.message).to.be.equals("Verified user!");
    
  })
  it("Inicio de sesión correctamente", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response  //en header esta la cookie y el token
    token.key = headers["set-cookie"][0].split("=")[0]   //el elemento0
    token.value = headers["set-cookie"][0].split("=")[1] //el elemento1
    expect(statusCode).to.be.equals(200)
  });
  //para cerrar sesion necesito pasar la autorizacion, o sea la cookie con el token
  it("Cerrado de sesión correctamente", async () => {
    const response = await requester.post("/sessions/signout").set("Cookie",[token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200); //el profe recomienda q en este test no solo se testee el statusCode
    //le gustaria q hagamos otro test tb
  });

  it("Inicio de sesión correctamente", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response  //en header esta la cookie y el token
    token.key = headers["set-cookie"][0].split("=")[0]   //el elemento0
    token.value = headers["set-cookie"][0].split("=")[1] //el elemento1
    expect(statusCode).to.be.equals(200)
  });

  it("Read One User funciona correctamente", async () => {
    const response = await requester.post("/users").send(uid)
    .set('Cookie', `${token.key}=${token.value}`);
    const { statusCode } = response;
    //console.log(response);
    expect(statusCode).to.be.equals(200)
  });


  it("Eliminación de un usuario correctamente", async () => {
    //para ver q parametro le debo pasar me debo fijar en el router (en este caso de users)
    const response = await requester.delete("/users/" + uid)
    .set('Cookie', `${token.key}=${token.value}`);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
  

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