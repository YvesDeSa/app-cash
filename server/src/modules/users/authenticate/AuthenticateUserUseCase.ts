import { User } from "@prisma/client";
import AppError from "../../../errors/AppError";
import prisma from "../../../prisma/client";
import { UserDTO } from "../dtos/CreateUserDTO";
import { BCryptHashProvider } from "../providers/BCryptHashProvider";

import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth"

interface Response {
  user: User;
  token: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: UserDTO): Promise<Response> {

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      throw new AppError('Incorrect email/passaword combination', 401);
    }

    const passawordMatched = await BCryptHashProvider.compareHash(password, user.password);

    if (!passawordMatched) {
      throw new AppError('Incorrect email/passaword combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return { user, token };
  }
}