import fetch, { Response } from 'node-fetch';
import { Parser } from 'xml2js';
import * as fs from 'fs';
import synsetParser from './synsetParser';

const XML_URL = 'https://s3.amazonaws.com/static.operam.com/assignment/structure_released.xml';
const FILE_NAME = 'export.json';

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
    const flattenArray = synsetParser(json.ImageNetStructure.synset);
    const jsonArray = JSON.stringify(flattenArray, null, 2);
    return writeFile(jsonArray);
  })
  .then(() => {
    console.log('Done');
  })
  .catch(err => {
    console.error(err);
  });
