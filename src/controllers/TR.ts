import TR from '../models/TR';
import { Index } from '../types/Index';

class TRController {
  async all(): Promise<Index[] | boolean> {
    try {
      const allTr = await TR.all();
      return allTr;
    } catch (err) {
      console.error('Failed fetching all TR indexes.', err);
      return false;
    }
  }

  async one(date?: string): Promise<Index | boolean> {
    try {
      const tr = await TR.one(date);
      return tr;
    } catch (err) {
      console.error('Failed fetching requested TR index.', err);
      return false;
    }
  }

  async last(): Promise<Index | boolean> {
    try {
      const lastTr = await TR.last();
      return lastTr;
    } catch (err) {
      console.error('Failed fetching last TR index.', err);
      return false;
    }
  }
}

export default new TRController();
