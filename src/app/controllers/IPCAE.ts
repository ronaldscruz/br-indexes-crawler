// Libs
import express from 'express';

// Model
import IPCAE from '../models/IPCAE';

class TRController {
  async all(req: express.Request, res: express.Response): Promise<void> {
    res.send(await IPCAE.all());
  }

  async one(req: express.Request, res: express.Response): Promise<void> {}

  async last(req: express.Request, res: express.Response): Promise<void> {}
}

export default new TRController();
