// src/types.d.ts
import { User } from './users/user.entity';

declare global {
  namespace Express {
    interface User extends User {}  // Ensuring Express.User matches your User entity
  }
}