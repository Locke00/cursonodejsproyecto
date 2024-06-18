import { Router } from "express";
import winstonLog from "../../utils/logger/index.js";

const formRouter = Router();

formRouter.get("/", (req, res, next) => {
  try {
    const user = res.locals.user
    winstonLog.INFO(JSON.stringify(user));
    if (!user) {
      return res.redirect("/");
    }


    return res.render("form", { title: "Formulario" });
  } catch (error) {
    winstonLog.INFO("x aqui paso -catch");
    next(error);
  }
});

export default formRouter;
