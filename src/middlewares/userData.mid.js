// Archivo: middlewares/userData.middleware.js
import { verifytoken } from '../utils/token.util.js';
import users from '../data/mongo/users.mongo.js';

async function userDataMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }
    
    const data = verifytoken(token, process.env.SECRET);
    const user = await users.readByEmail(data.email);
    
    if (user) {
      res.locals.user = user;
      res.locals.isAdminsitrator = user.role === 1 ? 'administrator' : undefined;
      res.locals.isUser = user.role === 0 ? 'user' : undefined;
    }
  } catch (error) {
    console.error('Error en el middleware userDataMiddleware', error);
  }
  next();
}

export default userDataMiddleware;