import { Request, Response } from "express";
import { UserAccountUseCase } from "./UserAccountUseCase";

export class UserAccountController {
  public async handle(request: Request, response: Response) {
    const id = request.user.id;

    const userAccountUseCase = new UserAccountUseCase();

    const result = await userAccountUseCase.execute({ id });

    return response.status(201).json(result);
  }
}