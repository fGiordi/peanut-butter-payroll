import app from '@/src/app';
import  { connectDB } from '@src/db';

require('dotenv').config();

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
