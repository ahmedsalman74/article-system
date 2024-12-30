// src/comments/dto/create-comment.dto.ts
import { IsString, MinLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  articleId: number;

  @ApiProperty({ example: 'Great article!' })
  @IsString()
  @MinLength(1)
  content: string;
}
