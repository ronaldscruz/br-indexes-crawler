// Libs
import express from 'express';

// Model
import IPCAE from '../models/IPCAE';

// Utils
import { isValidDate } from '../utils/date';

class TRController {
  async all(req: express.Request, res: express.Response): Promise<void> {
    try {
      const allIpcae = await IPCAE.all();
      res.status(200).json(allIpcae);
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
      const ipcae = await IPCAE.one(date);
      res.status(200).json(ipcae);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async last(req: express.Request, res: express.Response): Promise<void> {
    try {
      const lastIpcae = await IPCAE.last();
      res.status(200).json(lastIpcae);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new TRController();
