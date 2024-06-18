import CustomRouter from "../CustomRouter.js";
import winstonLog from "../../utils/logger/index.js";

class LoggersRouter extends CustomRouter {
  init(){
    this.create("/", ["PUBLIC"], testLoggers)
  }
}


function testLoggers(req, res, next){
  winstonLog.HTTP('Este es un log de HTTP')
  winstonLog.INFO('Este es un log de INFO')
  winstonLog.ERROR('Este es un log de ERROR')
  winstonLog.FATAL('Este es un log FATAL')

  
  return res.success200('finalizado logger')
}

const loggersRouter = new LoggersRouter()
export default loggersRouter.getRouter()




