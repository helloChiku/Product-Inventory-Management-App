import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import { errorHandler } from '@/src/middleware/error.middleware';
import { xssSanitizer } from '@/src/middleware/xss.middleware';
import { preventHPP } from '@/src/middleware/hpp.middleware';
import appConfig from '@/src/config/Index';
import fs from 'fs';
import { connectDB } from '@/www/db/index';

dotenv.config();


const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

/* ========================= CORS ========================*/
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', appConfig.allowedCorsOrigin);
  res.header('Access-Control-Allow-Methods', appConfig.allowedCorsMethods);
  res.header('Access-Control-Allow-Headers', appConfig.allowedCorsHeaders);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  next();
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xssSanitizer);
app.use(preventHPP);
app.use(limiter);

const routePath = './src/routes';
fs.readdirSync(routePath).forEach((file) => {
  if (~file.indexOf('.ts')) {
    const router = require(routePath + '/' + file);
    router.setRouter(app);
  }
});

const schemaPath = './src/model';
fs.readdirSync(schemaPath).forEach((file) => {
  console.log(file, 'file');
  if (file.endsWith('.ts')) {
    require(`${schemaPath}/${file}`);
  }
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1);
  // application specific logging, throwing an error, or other logic here
});

app.use('*', (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.status = 404;
  next(error);
});

app.use(errorHandler);

// DB Connection
connectDB(app);

export default app;
