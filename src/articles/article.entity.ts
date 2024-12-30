// src/articles/article.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Comment } from '../comments/comment.entity';
  import { Like } from '../likes/like.entity';
  
  @Entity()
  export class Article {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column('text')
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Relations
    @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
    author: User;
  
    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[];
  
    @OneToMany(() => Like, (like) => like.article)
    likes: Like[];
  }
  