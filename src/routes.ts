import express from 'express';

import TRController from './app/controllers/TR';
import IPCAE from './app/controllers/IPCAE';
import INPC from './app/controllers/INPC';

const routes = express.Router();

routes.get('/tr', TRController.all);
routes.get('/tr/last', TRController.last);
routes.get('/tr/:date', TRController.one);

routes.get('/ipcae', IPCAE.all);
routes.get('/ipcae/last', IPCAE.last);
routes.get('/ipcae/:date', IPCAE.one);

routes.get('/inpc', INPC.all);
routes.get('/inpc/last', INPC.last);
routes.get('/inpc/:date', INPC.one);

export default routes;
