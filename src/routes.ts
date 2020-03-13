import express from 'express';

import TRController from './app/controllers/TR';
import IPCAE from './app/controllers/IPCAE';

const routes = express.Router();

routes.get('/tr', TRController.all);
routes.get('/tr/last', TRController.last);
routes.get('/tr/:date', TRController.one);

routes.get('/ipcae', IPCAE.all);
routes.get('/ipcae/last', IPCAE.last);
routes.get('/ipcae/:date', IPCAE.one);

export default routes;
