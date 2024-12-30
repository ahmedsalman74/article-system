// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Article } from './articles/article.entity';
import { Comment } from './comments/comment.entity';
import { Like } from './likes/like.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configure TypeORM to use DATABASE_URL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Article, Comment, Like],
        synchronize: true, // **Important:** Set to false in production
        ssl: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ArticlesModule,
    CommentsModule,
    LikesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
