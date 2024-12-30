// src/likes/likes.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Like } from './like.entity';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  // Like an article
  async like(articleId: number, user: User): Promise<Like> {
    const article = await this.articlesRepository.findOne({ where: { id: articleId } });

    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }

    const existingLike = await this.likesRepository.findOne({ where: { article, user } });
    if (existingLike) {
      throw new ConflictException('You have already liked this article');
    }

    const like = this.likesRepository.create({ article, user });
    return this.likesRepository.save(like);
  }

  // Undo like
  async undoLike(articleId: number, user: User): Promise<void> {
    const article = await this.articlesRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }

    const like = await this.likesRepository.findOne({ where: { article, user } });
    if (!like) {
      throw new NotFoundException('You have not liked this article');
    }

    await this.likesRepository.remove(like);
  }
}
