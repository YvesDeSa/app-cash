import { Request, Response } from "express";
import { SearchByUserUseCase } from "./SearchByUserUseCase";

export class SearchByUserController {
  public async handle(request: Request, response: Response) {
    const id = request.user.id;

    const searchByUserUseCase = new SearchByUserUseCase();

    const result = await searchByUserUseCase.execute({ id });

    return response.status(201).json(result);
  }
}