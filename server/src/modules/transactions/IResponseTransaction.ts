export interface IResponseTransaction {
  id: string;
  date: Date;
  value: number;
  usernameCashIn: string | undefined;
  usernameCashOut: string | undefined;
}