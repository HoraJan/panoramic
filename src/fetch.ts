import fetch, { Response } from 'node-fetch';
import { Parser } from 'xml2js';
import * as fs from 'fs';
import { parseSynsetToArray } from './synsetParser';
import { XML_URL, FILE_NAME } from './constants.json';

const writeFile = (data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(FILE_NAME, data, (err: any) => {
      if (err) {
        reject(err);
      }

      console.log('The file has been saved!');
      resolve();
    });
  });
};

fetch(XML_URL)
  .then((value: Response) => {
    return value.text();
  })
  .then((text: string) => {
    const parser = new Parser();
    return parser.parseStringPromise(text);
  })
  .then(json => {
    const flattenArray = parseSynsetToArray(json.ImageNetStructure.synset);
    const jsonArray = JSON.stringify(flattenArray, null, 2);
    return writeFile(jsonArray);
  })
  .then(() => {
    console.log('Done');
  })
  .catch(err => {
    console.error(err);
  });
