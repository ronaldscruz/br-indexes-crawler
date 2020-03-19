// Utils for handling indexes

import { Index } from '../../types/Index';

/**
 * Returns an entire month with indexes in it, all based on a initial date and value.
 * e.g. 2001-01-01 should return: 2001-01-02, 2001-01-03, ..., 2001-01-31 and all these
 * days will have the same initial value
 * @param initialDate An date with day 01
 * @param indexValue The value of the index to be spreaded all over the dates
 */
export function createDailyIndex(index: Index): Index[] {
  const { date, value: indexValue } = index;

  const initialDate = new Date(date);
  const initialDateYear = initialDate.getFullYear();
  const initialDateMonth = initialDate.getMonth();

  const dateWaitingForDay = date.slice(0, 7);

  const remainingDays: number = new Date(
    initialDateYear,
    initialDateMonth + 2,
    0,
  ).getDate();

  // Creates an array with remaining days quantity
  let remainingDaysList: string[] = Array.from(
    new Array(remainingDays),
    (_, d) => `${d + 1}`,
  );

  remainingDaysList.shift();

  // Inserts and 0 before day number if it's lower than 10
  remainingDaysList = remainingDaysList.map(d => (+d < 10 ? `0${d}` : d));

  const dailyIndexList: Index[] = [index];

  remainingDaysList.forEach(day => {
    dailyIndexList.push({
      date: `${dateWaitingForDay}-${day}`,
      value: indexValue,
    });
  });

  return dailyIndexList;
}
