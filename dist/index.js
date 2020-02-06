"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const port = 8080 || process.env.PORT;
app.get('/', (req, res) => {
    res.send('✅ API Running.');
});
app.listen(port, () => {
    console.log('🚀 Server running at: http://localhost:', port);
});
//# sourceMappingURL=index.js.map