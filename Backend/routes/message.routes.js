import express from "express";
import { msgSend } from "../controllers/msgController.js";
import { checkAuthen } from "../middlewares/checkAuthentication.js";

const msgRoute = express.Router();
msgRoute.use(checkAuthen);

msgRoute.post("/send/:id", msgSend);

export default msgRoute;
