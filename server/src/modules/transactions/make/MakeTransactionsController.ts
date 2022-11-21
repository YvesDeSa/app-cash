import { Request, Response } from "express";
import { MakeTransactionsUseCase } from "./MakeTransactionsUseCase";

export class MakeTransactionsController {
  public async handle(request: Request, response: Response) {
    const { username, value } = request.body;

    const id = request.user.id;

    const makeTransactionsUseCase = new MakeTransactionsUseCase();

    await makeTransactionsUseCase.execute({ id, username, value: Number(value) });

    return response.status(201).json({ message: "success" });
  }
}