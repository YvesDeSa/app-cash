import { Request, Response } from "express";
import { SearchByDateUseCase } from "./SearchByDateUseCase";

export class SearchByDateController {
  public async handle(request: Request, response: Response) {
    const id = request.user.id;
    const { date } = request.query;

    const searchByDateUseCase = new SearchByDateUseCase();

    const result = await searchByDateUseCase.execute({ id, date: String(date) });

    return response.status(201).json(result);
  }
}