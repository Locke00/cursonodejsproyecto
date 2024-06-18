import { verifytoken } from "../utils/token.util.js";
//import winstonLog from "../utils/logger/index.js";

export default (req, res, next) => {
  try {
    //winstonLog.INFO(JSON.stringify(req));
    const token = req.cookies.token
    //winstonLog.INFO(JSON.stringify(toke));
    const userData = verifytoken(token)
    
  
    const { role } = userData;
    //winstonLog.INFO(role);
    if (role === 1 ) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
