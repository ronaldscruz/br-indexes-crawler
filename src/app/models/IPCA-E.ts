// Libs

// Types
import { Index } from '../types/Index';

// Utils

class IPCAE {
  SIDRA_API_ENDPOINT: string;
  DOWNLOADS_PATH: string;

  constructor() {
    this.SIDRA_API_ENDPOINT = '/t/1419/p/all/v/63/n1/1';
    this.DOWNLOADS_PATH = `${__dirname}/../../temp`;
  }

  /**
   * Fetches all IPCA-E indexes from a sheet
   */
  async all(): Promise<Index[]> {}

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
