import app from './app';
import  { connectDB } from './db';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import serverless from 'serverless-http';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});


export const handler = serverless(app);

