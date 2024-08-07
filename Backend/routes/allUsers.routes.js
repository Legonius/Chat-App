import express from "express";
import { checkAuthen } from "../middlewares/checkAuthentication.js";
import { getAllUsers } from "../controllers/allUserController.js";

const allUsersRoute = express.Router();
allUsersRoute.use(checkAuthen);

// app.use("/api/all-users", allUsersRoute);
allUsersRoute.get("/", getAllUsers);
export default allUsersRoute;
