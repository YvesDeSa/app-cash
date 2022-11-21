import AppError from "../../../errors/AppError";
import prisma from "../../../prisma/client";
import { SearchTransactionsDTO } from "../dtos/SearchTransactionsDTO";
import { IResponseTransaction } from "../IResponseTransaction";

export class SearchByUserUseCase {
  async execute({ id }: SearchTransactionsDTO): Promise<IResponseTransaction[]> {

    const userAccount = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        account: true
      }
    })

    const allTransactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { creditedAccountId: userAccount!.account.id },
          { debitedAccountId: userAccount!.account.id }
        ]
      },
      include: {
        creditedaccount: {
          include: {
            User: true
          }
        },
        debitedAccount: {
          include: {
            User: true
          }
        },
      }
    });

    const responseTransactions = allTransactions.map((transaction) => (
      {
        id: transaction.id,
        date: transaction.create_at,
        value: transaction.value,
        usernameCashIn: transaction.creditedaccount.User?.username,
        usernameCashOut: transaction.debitedAccount.User?.username
      }
    ));

    if (allTransactions.length === 0) {
      throw new AppError("No transactions for this user");
    }

    return responseTransactions;
  }
}