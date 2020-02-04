"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
class TrCrawler {
    all() {
        const sheet = xlsx_1.default.readFile('/home/ronald/Downloads/gerador_indices_tr.xls');
        console.log(sheet);
    }
}
exports.default = new TrCrawler();
//# sourceMappingURL=tr.js.map