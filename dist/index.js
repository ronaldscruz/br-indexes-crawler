'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
const xls_1 = require('./utils/xls');
dotenv_1.default.config();
const app = express_1.default();
const port = 8080 || process.env.PORT;
app.get('/', (req, res) => {
  res.send('✅ API Running.');
});
app.listen(port, () => {
  console.log('🚀 Server running at: http://localhost:', port);
  xls_1.saveDocumentToDownloads(
    'https://ww2.trtsp.jus.br/fileadmin/tabelas-praticas/gerador_indices_tr.xls',
    'tr_diaria.xls',
  );
});
//# sourceMappingURL=index.js.map
