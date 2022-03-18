import {
  FormattedTransactionList,
  TransactionItem,
  TransactionList,
  WeeksType,
} from './types';

/**
 *
 * @param year current year
 * @param month current month
 * @returns weeks object
 */
export const getWeeks = (
  year: number,
  selectedMonth: number = 0
): WeeksType => {
  const weeks: WeeksType = [];

  let month = selectedMonth || 0;

  // 0-6 first day of the month
  const firstWeekday = new Date(year, month, 1).getDay();

  let loopLength = 365; // TODO: dynamically get year length
  const totalWeeks = Math.ceil(loopLength / 7);
  let monthLength = new Date(year, month + 1, 0).getDate();

  if (selectedMonth) {
    loopLength = monthLength;
  }

  let day = 1;

  // Loop through weeks in a month
  for (let i = 0; i < totalWeeks; i++) {
    const week = [];
    let complete = false;

    for (let j = 0; j < 7; j++) {
      const dayIndex = i * 7 + j - firstWeekday;

      if (i === 0) {
        // first week
        if (j < firstWeekday) {
          // add empty days to the start of the month
          week.push(null);
        } else {
          week.push({
            i: dayIndex,
            day,
            month,
            year,
          });
          day++;
        }
      } else {
        // remaining weeks
        monthLength = new Date(year, month + 1, 0).getDate();

        if (day <= monthLength) {
          const elem = {
            i: dayIndex,
            day,
            month,
            year,
          };
          week.push(elem);
          day++;
        } else if (monthLength === loopLength || dayIndex >= loopLength) {
          // last day of the month/year
          complete = true;
          break;
        } else if (day <= loopLength) {
          // go to next month
          day = 1;
          month++;
          const elem = {
            i: i * 7 + j,
            day,
            month,
            year,
          };
          week.push(elem);
          day++;
        }
      }
    }

    weeks.push(week);

    // last week of the month/year
    if (complete) {
      break;
    }
  }

  return weeks;
};

/**
 * convert transaction data to an object of date keys with min and max
 * @param data transaction data
 * @returns formatted transactions
 */
export const formatTransactionData = (
  data: TransactionList
): FormattedTransactionList =>
  data.reduce((acc: FormattedTransactionList, curr: TransactionItem) => {
    const amount = curr.amount * (curr.transactionType === 'failed' ? -1 : 1);

    if (!acc.max) acc.max = amount;
    if (!acc.min) acc.min = amount;

    if (!acc[curr.date]) {
      acc[curr.date] = amount;
    } else {
      acc[curr.date] += amount;
    }

    acc.min = Math.min(acc.min, acc[curr.date]);
    acc.max = Math.max(acc.max, acc[curr.date]);

    return acc;
  }, {});

/**
 * add leading zero(s) to number
 * @param num number
 * @param limit upper limit
 * @returns a string of the supplied number
 */
export const padZero = (num: number, limit: number = 10): string =>
  num < limit ? `0${num}` : num.toString();

export const numberToCurrency = (num: number, sign: string = '£'): string =>
  sign + num.toLocaleString('en-GB');
