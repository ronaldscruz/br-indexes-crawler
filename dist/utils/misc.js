"use strict";
// Miscellaneous utils
Object.defineProperty(exports, "__esModule", { value: true });
function randomString(length = 7) {
    return Math.random()
        .toString(36)
        .substring(length);
}
exports.randomString = randomString;
//# sourceMappingURL=misc.js.map