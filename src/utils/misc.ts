// Miscellaneous utils

export function randomString(length = 7): string {
  return Math.random()
    .toString(36)
    .substring(length);
}
