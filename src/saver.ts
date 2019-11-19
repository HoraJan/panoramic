import * as storage from 'node-persist';
import * as fs from 'fs';
import { FILE_NAME, STORAGE_FOLDER, STORAGE_KEY } from './constants.json';

const readFile = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE_NAME, 'utf8', (err: any, data: string) => {
      if (err) {
        reject(err);
      }

      console.log('The file has been loaded!');
      resolve(data);
    });
  });
};

const initStorage = (): Promise<storage.InitOptions> => {
  return storage.init({ dir: STORAGE_FOLDER });
};

initStorage()
  .then(() => readFile())
  .then(fileString => {
    const array = JSON.parse(fileString);

    return storage.setItem(STORAGE_KEY, array);
  })
  .then(result => {
    console.log('done');
  })
  .catch(err => console.error(err));
