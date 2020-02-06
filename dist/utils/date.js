"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
// Helpers for dates (convert formats, read separated data like days, months, years, etc.)
/**
 * A "2001-01-01T03:00:00.000Z" date is received and a "2001-01-01" date is returned
 * @param date A "2001-01-01T03:00:00.000Z" date.
 */
function removeTimeFromDate(date) {
    if (util_1.isDate(date))
        date = date.toISOString();
    return date.slice(0, 10);
}
exports.removeTimeFromDate = removeTimeFromDate;
//# sourceMappingURL=date.js.map