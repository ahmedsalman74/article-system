// src/articles/dto/create-article.dto.ts
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'My First Article' })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({ example: 'This is the content of my first article.' })
  @IsString()
  @MinLength(20)
  content: string;
}
