// Libs
import axios from 'axios';
import cheerio from 'cheerio';

// Types
import { Index } from '../types/Index';

class IPCAE {
  ALL_IPCAE_URL: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.ALL_IPCAE_URL =
      'https://www.aasp.org.br/suporte-profissional/tabela-pratica-para-calculo-de-atualizacao-monetaria-ipca-e/';
    this.DOWNLOADS_PATH = `${__dirname}/../../temp`;
  }

  /**
   * Fetches all IPCA-E indexes from a sheet
   */
  async all(): Promise<Index[]> {
    const { data: ipcaePage } = await axios.get(this.ALL_IPCAE_URL);
    const $ = cheerio.load(ipcaePage);

    // Crawling tables and removing the last one
    const indexTablesObject = $('section>article>table');
    let indexTables = [];

    // Creates an array based on Cheerio scrapping
    Object.keys(indexTablesObject).forEach(k => {
      if (+k !== NaN && +k !== 5) indexTables.push(indexTablesObject[k]);
    });

    // Accepting only tables
    indexTables = indexTables.filter(itable => itable.name === 'table');

    console.log(indexTables.length);

    return [{ date: '2001-01-01', value: 0 }];
  }

  /**
   * Returns a single IPCA-E from the specified date
   * @param date a "2001-01-01" date
   */
  async one(date?: string): Promise<Index> {
    return { date: '0000-00-00', value: 0 };
  }

  /**
   * A shortcurt to fetch only the last occurrence of the IPCA-E index.
   */
  async last(): Promise<Index> {
    return { date: '0000-00-00', value: 0 };
  }
}

export default new IPCAE();
