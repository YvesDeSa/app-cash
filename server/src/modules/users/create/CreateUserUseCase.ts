import { User } from "@prisma/client";
import AppError from "../../../errors/AppError";
import prisma from "../../../prisma/client";
import { UserDTO } from "../dtos/CreateUserDTO";
import { BCryptHashProvider } from "../providers/BCryptHashProvider";

export class CreateUserUseCase {
  async execute({ username, password }: UserDTO): Promise<User> {

    const userAlreadyExists = await prisma.user.findUnique({
      where: { username }
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const account = await prisma.account.create({
      data: {
        balance: 100
      }
    });

    const passwordHashed = await BCryptHashProvider.generateHash(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHashed,
        accountId: account.id
      }
    });

    return user;
  }
}