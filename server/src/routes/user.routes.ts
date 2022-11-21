import { Router } from "express";
import ensureAuthenticate from "../middlewares/ensureAuthenticate";
import { UserAccountController } from "../modules/account/UserAccountController";
import { AuthenticateUserController } from "../modules/users/authenticate/AuthenticateUserController";
import { CreateUserController } from "../modules/users/create/CreateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const userAccountController = new UserAccountController();

const userRoutes = Router();

userRoutes.post("/create", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle)
userRoutes.get("/account", ensureAuthenticate, userAccountController.handle)

export { userRoutes };