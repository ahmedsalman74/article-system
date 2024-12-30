// src/articles/articles.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PoliciesGuard } from '../auth/policies.guard'; 
import { Request } from 'express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(PoliciesGuard) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  async create(@Body() createArticleDto: CreateArticleDto, @Req() req: Request) {
    return this.articlesService.create(createArticleDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({ status: 200, description: 'List of articles.' })
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single article by ID' })
  @ApiResponse({ status: 200, description: 'The found article.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PoliciesGuard) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req: Request
  ) {
    return this.articlesService.update(+id, updateArticleDto, req.user);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.articlesService.remove(+id, req.user);
  }
}