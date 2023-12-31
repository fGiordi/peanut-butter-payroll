import 'tsconfig-paths/register';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middleware';
import api from './routes';

import MessageResponse from '../src/interfaces/Responses/MessageResponse';
// eslint-disable-next-line import/no-extraneous-dependencies
import serverlessExpress  from '@vendia/serverless-express';
import { connectDB } from './db';

let serverlessExpressInstance: any;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, PUT, POST, DELETE',
  credentials: true,
}),
  
);
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// @ts-ignore
async function setup(event, context) {
  const asyncValue = await connectDB();
  console.log(asyncValue);
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

// @ts-ignore
export function handler(event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
}

export default app;
