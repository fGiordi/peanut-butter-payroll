import mongoose from 'mongoose';

require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.9knoiqg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


export const db = mongoose.connection;

