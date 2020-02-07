import axios from 'axios';
import fs from 'fs';

// Helpers for handling files

const DOWNLOADS_PATH = `${__dirname}/../temp/`;

/**
 * Downloads a file from a given URL
 * @param url URL to the file that will be downloaded
 */
export async function saveFileToDownloads(
  url: string,
  filename?: string,
): Promise<boolean> {
  try {
    const fileRequest = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    if (!filename) filename = url.split('/').pop();

    fs.writeFileSync(DOWNLOADS_PATH + filename, fileRequest.data);

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
export function removeFileFromDownloads(filename: string): boolean {
  try {
    fs.unlinkSync(DOWNLOADS_PATH + filename);

    return true;
  } catch (err) {
    console.error('Failed removing file.', err);
    return false;
  }
}
