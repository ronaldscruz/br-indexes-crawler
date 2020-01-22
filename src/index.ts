import express from 'express';
import prettier from 'prettier';

const app = express();
const port = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:', port);
});
