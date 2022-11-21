import { Account } from "@prisma/client";
import AppError from "../../errors/AppError";
import prisma from "../../prisma/client";

interface UserAccountDTO {
  id: string;
}


export class UserAccountUseCase {
  async execute({ id }: UserAccountDTO): Promise<Account> {
    const userAccount = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        account: true
      }
    })

    if (!userAccount) {
      throw new AppError('Account already exists');
    }

    return userAccount.account;
  }
}