import express from 'express';
import TRController from './controllers/TR';

const routes = express.Router();

routes.get('/tr', TRController.all);
routes.get('/tr/last', TRController.last);
routes.get('/tr/:date', TRController.one);

export default routes;
