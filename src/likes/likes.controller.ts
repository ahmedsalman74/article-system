// src/likes/likes.controller.ts
import { Controller, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PoliciesGuard } from '../auth/policies.guard'; 
import { Request } from 'express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':articleId')
  @UseGuards(PoliciesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like an article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully liked.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiResponse({ status: 409, description: 'Already liked.' })
  async like(@Param('articleId') articleId: string, @Req() req: Request) {
    return this.likesService.like(+articleId, req.user);
  }

  @Delete(':articleId')
  @UseGuards(PoliciesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Undo like on an article' })
  @ApiResponse({ status: 200, description: 'The like has been successfully undone.' })
  @ApiResponse({ status: 404, description: 'Article or like not found.' })
  async undoLike(@Param('articleId') articleId: string, @Req() req: Request) {
    return this.likesService.undoLike(+articleId, req.user);
  }
}
