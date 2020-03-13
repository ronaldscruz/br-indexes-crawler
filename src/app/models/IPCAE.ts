// Libs
import axios from 'axios';
import cheerio from 'cheerio';
import cheerioTableParser from 'cheerio-tableparser';

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
   * Fetches all IPCA-E indexes from the website
   */
  async all(): Promise<Index[]> {
    const { data: ipcaePage } = await axios.get(this.ALL_IPCAE_URL);
    const $ = cheerio.load(ipcaePage);

    // Stores all row content
    const allTables = [];

    // All tables
    $('section>article>table').each((_, indexesTable) => {
      // Each table
      const tableContent = [];

      $(indexesTable)
        .find('tr')
        .each((_, indexesTableRow) => {
          // Each row
          const rowContent = [];

          $(indexesTableRow)
            .children()
            .each((_, rowCol) => {
              // Each row col
              const colText: string = $(rowCol).text();
              !colText.includes('$') && colText.length > 0 && rowContent.push(colText);
            });

          rowContent.length > 0 && tableContent.push(rowContent);
        });

      tableContent.length > 0 && allTables.push(tableContent);
    });

    console.log(allTables[0][3][4]);

    return [{ date: '0000-00-00', value: 0 }];
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
