import xlsx from 'xlsx';
import { saveFileToDownloads, removeFileFromDownloads } from '../utils/files';
import { removeTimeFromDate } from '../utils/date';

interface Index {
  date: string;
  value: number;
}
class TR {
  ALL_TR_URL: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.ALL_TR_URL =
      'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls';
    this.DOWNLOADS_PATH = `${__dirname}/../downloads`;
  }

  /**
   * Fetches sall TR indexes from a sheet
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

  async one(date?: string): Index {}
}

export default new TR();
