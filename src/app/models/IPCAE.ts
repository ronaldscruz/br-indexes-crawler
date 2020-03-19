// Libs
import axios from 'axios';
import cheerio from 'cheerio';

// Types
import { Index } from '../types/Index';

// Utils
import { handleIpcaeTables } from '../utils/indexes/ipcae';

class IPCAE {
  ALL_IPCAE_URL: string;

  constructor() {
    this.ALL_IPCAE_URL =
      'https://www.aasp.org.br/suporte-profissional/tabela-pratica-para-calculo-de-atualizacao-monetaria-ipca-e/';
  }

  /**
   * Fetches all IPCA-E indexes from the website
   */
  async all(): Promise<Index[]> {
    let $;

    try {
      const { data: ipcaePage } = await axios.get(this.ALL_IPCAE_URL);
      $ = cheerio.load(ipcaePage);
    } catch (err) {
      throw new Error(
        `[IPCA-E] Failed fetching URL (${this.ALL_IPCAE_URL}), Error: ` + err,
      );
    }

    // Stores all index content
    const allTables = [];

    // Returns only tables with indexes inside it
    $('section>article>table').each((_, indexesTable): void => {
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

    const ipcaeIndexes: Index[] = handleIpcaeTables(allTables);

    return ipcaeIndexes;
  }

  /**
   * Returns a single IPCA-E from the specified date
   * @param date a "2001-01-01" date
   */
  async one(date?: string): Promise<Index> {
    const allIpcae = await this.all();
    const requestedIpcae = allIpcae.filter(ipcae => ipcae.date === date);

    if (requestedIpcae.length < 1)
      throw new Error(`No indexes were found with this date: ${date}`);

    return requestedIpcae[0];
  }

  /**
   * A shortcurt to fetch only the last occurrence of the IPCA-E index.
   */
  async last(): Promise<Index> {
    const allIpcae = await this.all();
    return allIpcae.pop();
  }
}

export default new IPCAE();
