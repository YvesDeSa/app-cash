import { Request, Response } from "express";
import { SearchByCashInUseCase } from "./SearchByCashInUseCase";

export class SearchByCashInController {
  public async handle(request: Request, response: Response) {
    const id = request.user.id;

    const searchByCashInUseCase = new SearchByCashInUseCase();

    const result = await searchByCashInUseCase.execute({ id });

    return response.status(201).json(result);
  }
}