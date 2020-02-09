// Miscellaneous utils

/**
 * Generates a random string.
 * @param length The length of the random string generated.
 */
export function randomString(length = 7): string {
  return Math.random()
    .toString(36)
    .substring(length);
}
