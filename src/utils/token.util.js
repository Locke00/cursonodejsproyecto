import jwt from "jsonwebtoken";

function createToken(data) {
  // entra un objeto q necesito convertir en token
  const token = jwt.sign(
    data, // data a encriptar (convertir a token)
    process.env.SECRET,
    { expiresIn: 60 * 60 * 24 * 7 } //fecha de caducidad de la contraseñas (es en segs)  (puse 7 dias)
  );
  return token; // sale un token
}

//en header se suelen enviar autorizaciones
function verifytoken(token) {
  //headers es una de las propiedades de los requerimientos
  //const token = headers.headers.token; //tengo q evaluar si existe y si es correcto
  if (token) {
    const data = jwt.verify(token, process.env.SECRET); //sale un objeto q yo cifre con el createToken()
    //TAREA q pasa si no verifica (hay q mandar un error)
    return data;
  }
  const error = new Error("bad auth token");  //definimos un error con un constructore de errores
  error.statusCode = 401; //le seteamos el stautsCode. pongo 401 xq no puedo identificar al usuario
  throw error;
}

/*
function verifytoken(headers) {
  try {
    const token = headers.token;
    if (token) {
      const data = jwt.verify(token, process.env.SECRET);
      return data;
    }
    throw new Error("Token not provided");
  } catch (error) {
    console.error(error.message);
    throw new Error("Invalid token");
  }
}
*/
export { createToken, verifytoken }