import { AppConfig } from '@/src/type/Index';
import EventEmitter from 'events';
import dotenv from 'dotenv';
dotenv.config();
const appConfig: AppConfig = {
  eventEmitter: new EventEmitter(),
  allowedCorsOrigin: '*',
  allowedCorsMethods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedCorsHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  allowCorsCredentials: 'true',
  apiVersion: '/api/v1/',
  db: {
    uri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zmo6ugy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  },
  baseUrl: '.',
};

export default appConfig;
