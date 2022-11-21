import { Request, Response } from "express";
import { SearchByCashOutUseCase } from "./SearchByCashOutUseCase";

export class SearchByCashOutController {
  public async handle(request: Request, response: Response) {
    const id = request.user.id;

    const searchByCashOutUseCase = new SearchByCashOutUseCase();

    const result = await searchByCashOutUseCase.execute({ id });

    return response.status(201).json(result);
  }
}