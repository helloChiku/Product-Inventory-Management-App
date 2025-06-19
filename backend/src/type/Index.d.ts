import { JwtPayload } from 'jsonwebtoken';

export interface AuthUserPayload {
  id: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload | JwtPayload;
    }
  }
}

export interface AppConfig {
  eventEmitter: EventEmitter;
  allowedCorsOrigin: string;
  allowedCorsMethods: string;
  allowedCorsHeaders: string;
  allowCorsCredentials: string;
  apiVersion: string;
  db: {
    uri: string;
  };
  baseUrl: string;
}
