// Libs
import express from 'express';

// Model
import TR from '../models/TR';

// Utils
import { isValidDate } from '../utils/date';

class TRController {
  async all(req: express.Request, res: express.Response): Promise<void> {
    try {
      const allTr = await TR.all();
      res.status(200).json(allTr);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async one(req: express.Request, res: express.Response): Promise<void> {
    const { date } = req.params;

    if (!isValidDate(date)) {
      res.status(400).json({ error: 'Please, insert a valid date (YYYY-MM-DD).' });
      return;
    }

    try {
      const tr = await TR.one(date);
      res.status(200).json(tr);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async last(req: express.Request, res: express.Response): Promise<void> {
    try {
      const lastTr = await TR.last();
      res.status(200).json(lastTr);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new TRController();
