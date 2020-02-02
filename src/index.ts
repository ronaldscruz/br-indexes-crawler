import express from 'express';

const app = express();
const port = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('✅ API Running.');
});

app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:', port);
});
