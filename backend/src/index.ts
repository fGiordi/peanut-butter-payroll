import app from '@/src/app';
import '@src/db'

require('dotenv').config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
