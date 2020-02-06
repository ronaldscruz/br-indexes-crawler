import xlsx from 'xlsx';
import { saveFileToDownloads, removeFileFromDownloads } from '../utils/files';
class TR {
  ALL_TR_URL: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.ALL_TR_URL =
      'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls';
    this.DOWNLOADS_PATH = `${__dirname}/../downloads`;
  }

  /**
   * Fetches all TR indexes from a sheet
   */
  async all() {
    const savedFileName = 'TR_All.xlsx';
    await saveFileToDownloads(this.ALL_TR_URL, savedFileName);

    const trIndexesSheet = xlsx.readFile(`${this.DOWNLOADS_PATH}/${savedFileName}`)
      .Sheets['Índices diários'];

    removeFileFromDownloads(savedFileName);
  }
}

export default new TR();
