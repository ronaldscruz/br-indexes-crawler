import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(routes);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ API Running.');
});

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:' + port);
});
