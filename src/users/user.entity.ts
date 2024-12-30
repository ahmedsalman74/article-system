// src/users/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Article } from '../articles/article.entity';
  import { Comment } from '../comments/comment.entity';
  import { Like } from '../likes/like.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string; // Hashed password
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Relations
    @OneToMany(() => Article, (article) => article.author)
    articles: Article[];
  
    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];
  
    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];
  }
  