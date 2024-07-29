import express from "express";
import { getMsg, msgSend } from "../controllers/msgController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";

const msgRoute = express.Router();
msgRoute.use(checkAuthen);

// Server extension use as =>app.use("/api/msg", msgRoute);
msgRoute.post("/send/:id", checkAuthen, msgSend);
msgRoute.get("/:id", checkAuthen, getMsg);

export default msgRoute;
