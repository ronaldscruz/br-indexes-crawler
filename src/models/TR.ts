import xlsx from 'xlsx';
import { saveFileToDownloads } from '../utils/files';

class TR {
  ALL_TR_URL: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.ALL_TR_URL =
      'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls';
    this.DOWNLOADS_PATH = `${__dirname}/../downloads/`;
  }

  all() {
    const savedFileName = 'TR_All.xlsx';

    saveFileToDownloads(this.ALL_TR_URL, savedFileName);
    console.log(xlsx.readFile(this.DOWNLOADS_PATH + savedFileName));
  }
}

export default new TR();
