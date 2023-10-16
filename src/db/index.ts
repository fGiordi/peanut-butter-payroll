
require('dotenv').config();
import  { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.9knoiqg.mongodb.net/?retryWrites=true&w=majority`;

let mongod: MongoMemoryServer;

export const connectDB = async () => {
  try {
    let dbUrl = MONGO_URI;
    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }
    const conn = await mongoose.connect(dbUrl, {
    });

    console.log('MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

export const cleanData = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
};




