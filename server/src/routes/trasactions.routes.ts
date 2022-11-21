import { Router } from "express";
import ensureAuthenticate from "../middlewares/ensureAuthenticate";
import { MakeTransactionsController } from "../modules/transactions/make/MakeTransactionsController";
import { SearchByCashInController } from "../modules/transactions/search-by-cash-in/SearchByCashInController";
import { SearchByCashOutController } from "../modules/transactions/search-by-cash-out/SearchByCashOutController";
import { SearchByDateController } from "../modules/transactions/search-by-date/SearchByDataController";
import { SearchByUserController } from "../modules/transactions/search-by-user/SearchByUserController";

const makeTransactionsController = new MakeTransactionsController();
const searchByUserController = new SearchByUserController();
const searchByCashInController = new SearchByCashInController();
const searchByCashOutController = new SearchByCashOutController();
const searchByDateController = new SearchByDateController();

const transactionRoutes = Router();

transactionRoutes.use(ensureAuthenticate);

transactionRoutes.post("/make", makeTransactionsController.handle);
transactionRoutes.get("/cash-in", searchByCashInController.handle);
transactionRoutes.get("/cash-out", searchByCashOutController.handle);
transactionRoutes.get("/user", searchByUserController.handle);
transactionRoutes.get("/date", searchByDateController.handle);

export { transactionRoutes };