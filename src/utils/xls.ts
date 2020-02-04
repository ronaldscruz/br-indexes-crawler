import axios from 'axios';
import fs from 'fs';

import { randomString } from './misc';

// Helpers for reading XLS/XLSX documents

/**
 * Downloads a document from a given URL
 * @param url URL to the document that will be downloaded
 */
export async function saveToDownloads(
  url: string,
  filename: string = randomString(),
): Promise<boolean> {
  try {
    const fileRequest = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(filename, fileRequest.data);

    return true;
  } catch (err) {
    console.error('Failed downloading file.', err);

    return false;
  }
}

/**
 * Removes any file from "downloads" folder
 * @param filename File to be removed
 */
export async function removeFileFromDownloads(filename: string): boolean {
  return false;
}
