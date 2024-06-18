import { users } from "../data/mongo/manager.mongo.js"
import isValidPasswordUtils from "../utils/isValidPass.util.js"

async function isValidPassword(req, res, next) {
  try {
    const { email, password } = req.body
    const one = await users.readByEmail(email)
    const dbPassword = one.password
    isValidPasswordUtils(password,dbPassword)
    return next()

  } catch (error) {
    return next(error)
  }
}

export default isValidPassword
