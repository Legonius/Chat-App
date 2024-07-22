import express from "express";
import { checkAuthen } from "../middlewares/checkAuthentication.js";
import { getAllUsers } from "../controllers/allUserController.js";

const allUsersRoute = express.Router();
allUsersRoute.use(checkAuthen);

allUsersRoute.get("/", getAllUsers);
export default allUsersRoute;
