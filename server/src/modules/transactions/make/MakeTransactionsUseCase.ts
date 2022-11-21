import AppError from "../../../errors/AppError";
import prisma from "../../../prisma/client";
import { MakeTransactionsDTO } from "../dtos/MakeTransactionsDTO";

export class MakeTransactionsUseCase {
  async execute({ id, username, value }: MakeTransactionsDTO): Promise<void> {
    const creditedAccountUser = await prisma.user.findUnique({
      select: {
        account: true
      },
      where: {
        username,
      }
    });

    const debitedAccountUser = await prisma.user.findUnique({
      select: {
        username: true,
        account: true
      },
      where: {
        id
      }
    })

    if (username === debitedAccountUser?.username) {
      throw new AppError("User cannot transfer to himself");
    }


    if (debitedAccountUser && debitedAccountUser.account.balance < value) {
      throw new AppError("User does not have this value in his account", 402);
    }


    if (!creditedAccountUser) {
      throw new AppError("User already exists");
    }

    if (debitedAccountUser && creditedAccountUser) {
      await prisma.account.updateMany({
        where: {
          id: debitedAccountUser.account.id
        },
        data: {
          balance: debitedAccountUser.account.balance - value
        }
      })

      await prisma.account.updateMany({
        where: {
          id: creditedAccountUser.account.id
        },
        data: {
          balance: creditedAccountUser.account.balance + value
        }
      })

      await prisma.transaction.create({
        data: {
          value,
          creditedAccountId: creditedAccountUser.account.id,
          debitedAccountId: debitedAccountUser.account.id
        }
      });
    }

  }
}