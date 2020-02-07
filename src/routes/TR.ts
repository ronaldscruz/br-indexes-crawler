import express from 'express';
import TRController from '../controllers/TR';

const TRRouter = express.Router();

TRRouter.get('/', async (req, res) => {
  try {
    const allTr = await TRController.all();
    res.status(200).json(allTr);
  } catch (err) {
    res.status(400).json({ err });
  }
});

TRRouter.get('/one/:date', async (req, res) => {
  const { date } = req.params;

  !date && res.status(400).json({ error: 'Required parameter: date (YYYY-MM-DD)' });

  try {
    const oneTr = await TRController.one(date);
    res.status(200).json(oneTr);
  } catch (err) {
    res.status(400).json({ err });
  }
});

TRRouter.get('/last', async (req, res) => {
  try {
    const lastTr = await TRController.last();
    res.status(200).json(lastTr);
  } catch (err) {
    res.status(400).json({ err });
  }
});

export default TRRouter;
