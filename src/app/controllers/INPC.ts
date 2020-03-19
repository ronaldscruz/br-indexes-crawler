// Libs
import express from 'express';

// Model
import INPC from '../models/INPC';

// Utils
import { isValidDate } from '../utils/misc/date';

class TRController {
  async all(req: express.Request, res: express.Response): Promise<void> {
    try {
      const allInpc = await INPC.all();
      res.status(200).json(allInpc);
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
      const inpc = await INPC.one(date);
      res.status(200).json(inpc);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async last(req: express.Request, res: express.Response): Promise<void> {
    try {
      const lastInpc = await INPC.last();
      res.status(200).json(lastInpc);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new TRController();
