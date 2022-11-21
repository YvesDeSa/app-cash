import { Transaction } from "@prisma/client";
import AppError from "../../../errors/AppError";
import prisma from "../../../prisma/client";
import { SearchTransactionsDTO } from "../dtos/SearchTransactionsDTO";
import { IResponseTransaction } from "../IResponseTransaction";

export class SearchByCashOutUseCase {
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
      where: { debitedAccountId: userAccount!.account.id },
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
        }
      }
    });

    if (allTransactions.length === 0) {
      throw new AppError("No transactions for this user");
    }
    const responseTransactions = allTransactions.map((transaction) => (
      {
        id: transaction.id,
        date: transaction.create_at,
        value: transaction.value,
        usernameCashIn: transaction.creditedaccount.User?.username,
        usernameCashOut: transaction.debitedAccount.User?.username
      }
    ));


    return responseTransactions;
  }
}