import winstonLog from "../utils/logger/index.js";
function errorHandler(error, req, res, next) {
  if (!error.statusCode || error.statusCode===500) { //si no envio el statusCode, o es 500, lo mando
    error.statusCode = 500              //a winston con el codigo de error 500
    winstonLog.ERROR(error.message)
  } else {
    winstonLog.WARN(error.message)
  }
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${error.message}`
  })
}

export default errorHandler