import winstonLog from "../utils/logger/index.js";

function pathHandler(req,res,next) {
  winstonLog.ERROR(`${req.method} ${req.url} not found path`);
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} not found endpoint`
  })
}

export default pathHandler 