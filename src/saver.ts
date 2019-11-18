import * as storage from 'node-persist';
import * as fs from 'fs';
import { FILE_NAME } from './constants.json';

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
  return storage.init({ dir: 'storage' });
};

initStorage()
  .then(() => readFile())
  .then(fileString => {
    const array = JSON.parse(fileString);

    return storage.setItem('data', array);
  })
  .then(result => {
    console.log(result);
    console.log('done');
  })
  .catch(err => console.error(err));
