import { isDate } from 'util';

// Helpers for dates (convert formats, read separated data like days, months, years, etc.)

/**
 * Before: "2001-01-01T03:00:00.000Z" | After: "2001-01-01"
 * @param date A "2001-01-01T03:00:00.000Z" date.
 */
export function removeTimeFromDate(date: string | Date): string {
  if (isDate(date)) date = date.toISOString();
  return date.slice(0, 10);
}

/**
 * A shallow validation of a date.
 * @param date A "YYYY-MM-DD date."
 */
export function isValidDate(date: string | Date): boolean {
  if (!isDate(date)) date = new Date(`${date} 00:00:00`);

  return date.toString() !== 'Invalid Date';
}
