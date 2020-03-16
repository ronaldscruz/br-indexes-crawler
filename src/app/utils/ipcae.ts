// IPCA-E crawling utils

import { Index } from '../types/Index';
import { shortMonthToISOCode } from './date';

/**
 * Returns an entire month with indexes in it, all based on a initial date and value.
 * e.g. 2001-01-01 should return: 2001-01-02, 2001-01-03, ..., 2001-01-31 and all these
 * days will have the same initial value
 * @param initialDate An date with day 01
 * @param indexValue The value of the index to be spreaded all over the dates
 */
function createDailyIndex(index: Index): Index[] {
  const { date, value: indexValue } = index;

  const initialDate = new Date(date);

  const initialDateYear = initialDate.getFullYear();
  const initialDateMonth = initialDate.getMonth();

  const remainingDays: number =
    new Date(initialDateYear, initialDateMonth, 0).getDate() - 1;
}

/**
 * Extracts a complete Index from an IPCA-E row
 * @param row Row of IPCA-E table
 * @param yearsMap A object that tells the index of each year inside the row
 */
function extractRowIndexes(row, yearsMap): Index[] {
  const monthCode = shortMonthToISOCode(row[0]);

  const extractedIndexes: Index[] = [];

  row.forEach((col, colIndex) => {
    // Ignores the "Mês/Ano" col
    if (colIndex === 0) return;

    // Also ignores empty index values
    if (col === '–') return;

    // Transforming it into a universal decimal value
    col = +col.replace('.', '').replace(',', '.');

    const yearBasedOnColIndex = yearsMap[colIndex];

    const indexFromCol: Index = {
      date: `${yearBasedOnColIndex}-${monthCode}-01`,
      value: col,
    };

    createDailyIndex(indexFromCol);

    extractedIndexes.push(indexFromCol);
  });

  return extractedIndexes;
}

/**
 * Returns all IPCA-E ready to be sent back as JSON to the controller
 * @param tables Tables containing IPCA-E indexes following the structure of the website
 */
export function handleIpcaeTables(tables: string[][][]): Index[] {
  let allTablesIndexes: Index[] = [];

  tables.forEach(tableRows => {
    // Setting list of years and creating yearsMap to call extractRowIndexes()
    const yearsAvailable: string[] = tableRows.shift();
    const yearsMap = {};

    yearsAvailable.forEach((year, yearIndex) => {
      // Ignores the "Mês/Ano" label
      if (yearIndex === 0) return;
      yearsMap[yearIndex] = year;
    });

    // Extracting indexes from each row
    const tableIndexes: Index[] = [];

    tableRows.forEach(row => {
      const indexesFromRow = extractRowIndexes(row, yearsMap);
      tableIndexes.push(...indexesFromRow);
    });

    allTablesIndexes.push(...tableIndexes);
  });

  // Ordering indexes by date asc
  allTablesIndexes = allTablesIndexes.sort((a, b) => {
    const prevElementDate = new Date(a.date).getTime();
    const nextElementDate = new Date(b.date).getTime();
    return prevElementDate - nextElementDate;
  });

  return [{ date: '0000-00-00', value: 0 }];
}

/**
 * Returns the table containing indexes from the entered year
 * @param year The desired table year
 * @param yearTables Array with all 3D tables
 */
export function selectTableBasedOnYear(year: number, yearTables: string[][][]): number {
  return;
}
