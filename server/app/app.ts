import * as express from 'express';
import * as bodyParser from 'body-parser';
import Logger from './lib/logger';
import { initDB } from './db';
import api from './api';

export const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.json());
app.use(api);

initDB().then(() => {
  app.listen(3001, () => {
    Logger.info('Server is up and running on port 3001 !');
  });
});
