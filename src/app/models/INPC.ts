// Types
import { Index } from '../types/Index';

// Libs
import cheerio from 'cheerio';
import axios from 'axios';

// Utils
import { handleInpcTable } from '../utils/indexes/inpc';

class INPC {
  ALL_INPC_URL: string;

  constructor() {
    this.ALL_INPC_URL = 'https://www.indiceseindicadores.com.br/inpc/';
  }

  /**
   * Fetches all INPC indexes from the website
   */
  async all(): Promise<Index[]> {
    let $;

    try {
      const { data: ipcaePage } = await axios.get(this.ALL_INPC_URL);
      $ = cheerio.load(ipcaePage);
    } catch (err) {
      throw new Error(`[INPC] Failed fetching URL (${this.ALL_INPC_URL}), Error: ` + err);
    }

    // Stores all index content
    const inpcTableBody = $('#supsystic-table-6>tbody');
    const inpcTableRowsContent = [];

    $(inpcTableBody)
      .find('tr')
      .each((_, inpcRow) => {
        // Each row
        const rowContent = [];

        $(inpcRow)
          .children()
          .each((_, inpcRowCol) => {
            // Each row col
            const colText: string = $(inpcRowCol).text();
            colText && rowContent.push(colText);
          });

        inpcTableRowsContent.push(rowContent);
      });

    const inpcIndexes: Index[] = handleInpcTable(inpcTableRowsContent);

    return inpcIndexes;
  }

  /**
   * Returns a single INPC from the specified date
   * @param date a "2001-01-01" date
   */
  async one(date?: string): Promise<Index> {
    const allInpc = await this.all();
    const requestedInpc = allInpc.filter(inpc => inpc.date === date);

    if (requestedInpc.length < 1)
      throw new Error(`No indexes were found with this date: ${date}`);

    return requestedInpc[0];
  }

  /**
   * A shortcurt to fetch only the last occurrence of the INPC index.
   */
  async last(): Promise<Index> {
    const allInpc = await this.all();
    return allInpc.pop();
  }
}

export default new INPC();
