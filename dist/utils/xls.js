'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const axios_1 = __importDefault(require('axios'));
const fs_1 = __importDefault(require('fs'));
const misc_1 = require('./misc');
// Helpers for reading XLS/XLSX documents
/**
 * Downloads a document from a given URL
 * @param url URL to the document that will be downloaded
 */
function saveDocumentToDownloads(url, filename = misc_1.randomString()) {
  return __awaiter(this, void 0, void 0, function*() {
    try {
      const fileBuffer = yield axios_1.default.get(url);
      fs_1.default.writeFileSync('../downloads/' + filename, fileBuffer);
      return true;
    } catch (err) {
      console.error('Failed downloading file.', err);
      return false;
    }
  });
}
exports.saveDocumentToDownloads = saveDocumentToDownloads;
/**
 * Removes any file from "downloads" folder
 * @param filename File to be removed
 */
function removeDocumentFromDownloads(filename) {
  return __awaiter(this, void 0, void 0, function*() {
    return false;
  });
}
exports.removeDocumentFromDownloads = removeDocumentFromDownloads;
//# sourceMappingURL=xls.js.map
