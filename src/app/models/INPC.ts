// Types
import { Index } from '../types/Index';

class INPC {
  ALL_INPC_URL: string;

  constructor() {
    this.ALL_INPC_URL =
      'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls';
  }

  /**
   * Fetches all INPC indexes from the website
   */
  async all(): Promise<Index[]> {
    return [{ date: '0000-00-00', value: 0 }];
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
