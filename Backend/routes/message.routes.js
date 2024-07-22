import express from "express";
import { getMsg, msgSend } from "../controllers/msgController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";

const msgRoute = express.Router();
msgRoute.use(checkAuthen);

msgRoute.post("/send/:id", msgSend);
msgRoute.get("/:id", getMsg);

export default msgRoute;
