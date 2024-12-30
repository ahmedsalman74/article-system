// src/comments/comment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Article } from '../articles/article.entity';
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Relations
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    author: User;
  
    @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
    article: Article;
  }
  