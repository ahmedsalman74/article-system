// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Validate user credentials
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Login and return JWT
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Register new user
  async register(userData: CreateUserDto) {  
    const user = await this.usersService.create(userData);
    return this.login(user);
  }
}
