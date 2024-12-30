// src/comments/comments.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  // Create new comment
  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const article = await this.articlesRepository.findOne(createCommentDto.articleId);
    if (!article) {
      throw new NotFoundException(`Article with ID ${createCommentDto.articleId} not found`);
    }

    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      author: user,
      article,
    });

    return this.commentsRepository.save(comment);
  }

  // Find comments by article
  async findByArticle(articleId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { article: { id: articleId } },
      relations: ['author', 'article'],
    });
  }

  // Delete comment
  async remove(id: number, user: User): Promise<void> {
    const comment = await this.commentsRepository.findOne(id, { relations: ['author'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Authorization check
    if (comment.author.id !== user.id) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentsRepository.remove(comment);
  }
}
