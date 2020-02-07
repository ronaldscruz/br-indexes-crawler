import TR from '../models/TR';
import { Index } from '../types/Index';

class TRController {
  async all(): Promise<Index[]> {
    try {
      const allTr = await TR.all();
      return allTr;
    } catch (err) {
      console.error('Failed fetching all TR indexes.', err);
      return err;
    }
  }

  async one(date?: string): Promise<Index> {
    try {
      const tr = await TR.one(date);
      return tr;
    } catch (err) {
      console.error('Failed fetching requested TR index.', err);
      return err;
    }
  }

  async last(): Promise<Index> {
    try {
      const lastTr = await TR.last();
      return lastTr;
    } catch (err) {
      console.error('Failed fetching last TR index.', err);
      return err;
    }
  }
}

export default new TRController();
