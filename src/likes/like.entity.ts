// src/likes/like.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Unique,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Article } from '../articles/article.entity';
  
  @Entity()
  @Unique(['user', 'article']) // Prevent duplicate likes
  export class Like {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    // Relations
    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
    user: User;
  
    @ManyToOne(() => Article, (article) => article.likes, { onDelete: 'CASCADE' })
    article: Article;
  }
  