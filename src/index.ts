import express from 'express';
import dotenv from 'dotenv';

import TRRouter from './routes/TR';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('✅ API Running.');
});

app.use('/tr', TRRouter);

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:' + port);
});
