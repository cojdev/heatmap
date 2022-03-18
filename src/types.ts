export type WeeksType = {
  i: number;
  day: number;
  month: number;
  year: number;
}[][];

export type TransactionItem = {
  transactionType: 'failed' | 'success';
  date: string;
  amount: number;
};

export type TransactionList = TransactionItem[];

export type FormattedTransactionList = Record<string, number>;
