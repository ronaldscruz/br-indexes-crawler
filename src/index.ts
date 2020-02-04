import express from 'express';
import TrCrawler from './crawlers/tr';
import dotenv from 'dotenv';
import { saveToDownloads } from './utils/xls';

dotenv.config();

const app = express();
const port = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('✅ API Running.');
});

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:', port);

  saveToDownloads(
    'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls',
    'tr_diaria.xls',
  );
});
