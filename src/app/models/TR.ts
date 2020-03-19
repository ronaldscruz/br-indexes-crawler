// Libs
import xlsx from 'xlsx';

// Types
import { Index } from '../types/Index';

// Utils
import { saveFileToDownloads, removeFileFromDownloads } from '../utils/misc/files';
import { removeTimeFromDate } from '../utils/misc/date';

class TR {
  ALL_TR_URL: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.ALL_TR_URL =
      'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls';
    this.DOWNLOADS_PATH = `${__dirname}/../../temp`;
  }

  /**
   * Fetches all TR indexes from a sheet
   */
  async all(): Promise<Index[]> {
    const savedFileName = 'TR_All.xlsx';

    // Saving file inside downloads folder
    const fileWasSaved = await saveFileToDownloads(this.ALL_TR_URL, savedFileName);
    if (!fileWasSaved) throw new Error('[TR.all()] Failed saving file.');

    // Reading file and parsing it to object
    const trIndexesSheet = xlsx.readFile(`${this.DOWNLOADS_PATH}/${savedFileName}`, {
      cellDates: true,
    }).Sheets['Índices diários'];

    const trIndexesObject = xlsx.utils.sheet_to_json(trIndexesSheet, {
      header: ['date', 'value'],
      range: 2,
    });

    // Populating array of TR indexes
    const trIndexes: Index[] = [];

    Object.keys(trIndexesObject).forEach(triObjKey =>
      trIndexes.push(trIndexesObject[triObjKey]),
    );

    // Formatting dates
    trIndexes.map(tri => (tri.date = removeTimeFromDate(tri.date)));

    removeFileFromDownloads(savedFileName);

    return trIndexes;
  }

  /**
   * Returns a single TR from the specified date
   * @param date a "2001-01-01" date
   */
  async one(date?: string): Promise<Index> {
    const allTr = await this.all();
    const requestedTr = allTr.filter(tr => tr.date === date);

    if (requestedTr.length < 1)
      throw new Error(`No indexes were found with this date: ${date}`);

    return requestedTr[0];
  }

  /**
   * A shortcurt to fetch only the last occurrence of the TR index.
   */
  async last(): Promise<Index> {
    const allTr = await this.all();
    return allTr.pop();
  }
}

export default new TR();
