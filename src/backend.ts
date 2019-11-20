import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import * as storage from 'node-persist';
import { parseSynsetToObject, FinalObject } from './synsetParser';
import { STORAGE_FOLDER, STORAGE_KEY } from './constants.json';
import { sendFile } from './fileServer';

const getData = async (stringified: boolean = false): Promise<FinalObject | string | void> => {
  return storage
    .init({ dir: STORAGE_FOLDER })
    .then(() => storage.getItem(STORAGE_KEY))
    .then(result => {
      const object = parseSynsetToObject(result);
      if (stringified) {
        return JSON.stringify(object);
      }

      return object;
    })
    .catch(err => console.error(err));
};

const schema = buildSchema(`
type Query {
    stringifiedData: String
    treeData: FinalObject
  }

  type FinalObject {
    name: String
    size: Int
    children: [FinalObject]
  }  
`);

const root = {
  stringifiedData: async () => await getData(true),
  treeData: async () => await getData()
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP(async () => ({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))
);

app.use('/', (req: express.Request, res: express.Response) => {
  sendFile(req, res);
});

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
