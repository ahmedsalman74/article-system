// src/articles/articles.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  // Create new article
  async create(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    const article = this.articlesRepository.create({
      ...createArticleDto,
      author: user,
    });
    return this.articlesRepository.save(article);
  }

  // Find all articles
  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find({ relations: ['author', 'comments', 'likes'] });
  }

// Find one article by ID
async findOne(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id: id },
      relations: ['author', 'comments', 'likes']
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  // Update article
  async update(id: number, updateArticleDto: UpdateArticleDto, user: User): Promise<Article> {
    const article = await this.findOne(id);

    // Authorization check
    if (article.author.id !== user.id) {
      throw new ForbiddenException('You can only edit your own articles');
    }

    Object.assign(article, updateArticleDto);
    return this.articlesRepository.save(article);
  }

  // Delete article
  async remove(id: number, user: User): Promise<void> {
    const article = await this.findOne(id);

    // Authorization check
    if (article.author.id !== user.id) {
      throw new ForbiddenException('You can only delete your own articles');
    }

    await this.articlesRepository.remove(article);
  }
}
