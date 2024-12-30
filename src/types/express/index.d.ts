// src/types/express/index.d.ts
import 'express';
import { User } from '../../users/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}