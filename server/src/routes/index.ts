import { Router } from "express";
import { transactionRoutes } from "./trasactions.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/transactions", transactionRoutes);

export default routes;