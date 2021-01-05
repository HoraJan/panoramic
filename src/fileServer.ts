import * as express from 'express';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

interface FileTypes {
  [key: string]: string;
}

export const sendFile = (req: express.Request, res: express.Response): void => {
  const parsedUrl = url.parse(req.url || '');
  let pathname = path.join(__dirname + `/../packages/frontend/dist` + parsedUrl.pathname || '/');
  const ext = path.parse(pathname).ext;
  const map: FileTypes = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.exists(pathname, (exist: boolean) => {
    if (!exist) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    if (fs.statSync(pathname).isDirectory()) pathname += 'index.html';

    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
        return;
      }

      res.setHeader('Content-type', map[ext] || 'text/html');
      res.end(data);
    });
  });
};
