// IPCA-E crawling utils
import { Index } from '../types/Index';

import { createDailyIndex } from './indexes';
import { shortMonthToISOCode } from './date';

/**
 * Extracts a complete Index from an IPCA-E row
 * @param row Row of IPCA-E table
 * @param yearsMap A object that tells the index of each year inside the row
 */
function extractIndexesFromRow(row, yearsMap): Index[] {
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

    const dailyExtractedIndex: Index[] = createDailyIndex(indexFromCol);

    extractedIndexes.push(...dailyExtractedIndex);
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
    // Setting a list of current table years and creating yearsMap to call extractIndexesFromRow()
    const yearsAvailable: string[] = tableRows.shift();
    const yearsMap = {};

    yearsAvailable.forEach((year, yearIndex) => {
      // Ignores the "Mês/Ano" label
      if (yearIndex === 0) return;
      yearsMap[yearIndex] = year;
    });

    // Extracting index values from each row
    const tableIndexValues: Index[] = [];

    tableRows.forEach(row => {
      const indexesFromRow = extractIndexesFromRow(row, yearsMap);
      tableIndexValues.push(...indexesFromRow);
    });

    allTablesIndexes.push(...tableIndexValues);
  });

  // Ordering indexes by date asc
  allTablesIndexes = allTablesIndexes.sort((a, b) => {
    const prevElementDate = new Date(a.date).getTime();
    const nextElementDate = new Date(b.date).getTime();
    return prevElementDate - nextElementDate;
  });

  return allTablesIndexes;
}
