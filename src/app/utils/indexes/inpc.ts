// INPC crawling utils
import { Index } from '../../types/Index';

// Utils
import { shortMonthToISOCode } from '../misc/date';
import { createDailyIndex } from '../indexes/all';

/**
 * Extracts a complete Index from an INPC row
 * @param row Row of INPC table
 * @param monthsMap A object that tells the index of each month inside the row
 */
function extractIndexesFromRow(row, monthsMap): Index[] {
  const extractedIndexes: Index[] = [];

  const indexYear = row.shift().trim();
  row.pop();

  row.forEach((col, colIndex) => {
    col = col.trim();

    if (!col) return;

    // Transforming it into a universal decimal value
    col = +col.replace(',', '.');

    const monthBasedOnColIndex = monthsMap[colIndex];

    const indexFromCol: Index = {
      date: `${indexYear}-${monthBasedOnColIndex}-01`,
      value: col,
    };

    const dailyExtractedIndex: Index[] = createDailyIndex(indexFromCol);

    extractedIndexes.push(...dailyExtractedIndex);
  });

  return extractedIndexes;
}

/**
 * Returns all INPC ready to be sent back as JSON to the controller
 * @param tableRows Rows containing INPC indexes following the structure of the website
 */
export function handleInpcTable(tableRows: string[][]): Index[] {
  let inpcIndexes: Index[] = [];

  // Setting a list of current table months and creating monthsMap to call extractIndexesFromRow()
  const monthsAvailable: string[] = tableRows.shift();
  const monthsMap = {};

  monthsAvailable.pop();
  monthsAvailable.shift();

  monthsAvailable.forEach((month, monthIndex) => {
    month = month.trim();
    monthsMap[monthIndex] = shortMonthToISOCode(month);
  });

  // Extracting indexes from each row
  tableRows.forEach(row => {
    const indexesFromRow = extractIndexesFromRow(row, monthsMap);
    inpcIndexes.push(...indexesFromRow);
  });

  inpcIndexes = inpcIndexes.sort((a, b) => {
    const prevElementDate = new Date(a.date).getTime();
    const nextElementDate = new Date(b.date).getTime();
    return prevElementDate - nextElementDate;
  });

  return inpcIndexes;
}
