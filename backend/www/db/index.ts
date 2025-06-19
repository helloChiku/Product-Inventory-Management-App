import mongoose from 'mongoose';
import { startServer } from '../rest/index';
import { Express } from 'express';
import appConfig from '../../src/config/Index';
export const connectDB = async (app: Express) => {
  try {
    await mongoose.connect(appConfig.db.uri, {
      dbName: process.env.DB_NAME,
    });

    console.log('MongoDB connected');
    startServer(app);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
