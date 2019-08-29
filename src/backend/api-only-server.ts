import express from 'express';
import userInfoAPI from './api-server-middleware';

const app = express();

app.use(userInfoAPI());

app.listen(81);
