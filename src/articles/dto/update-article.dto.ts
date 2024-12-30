// src/articles/dto/update-article.dto.ts
import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiPropertyOptional({ example: 'Updated Article Title' })
  @IsOptional()
  @IsString()
  @MinLength(5)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content of the article.' })
  @IsOptional()
  @IsString()
  @MinLength(20)
  content?: string;
}
