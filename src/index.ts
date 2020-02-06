import express from 'express';
import dotenv from 'dotenv';
import TR from './models/TR';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('✅ API Running.');
});

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:', port);

  TR.all();
});
