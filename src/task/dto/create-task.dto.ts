import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorators.js';

export enum TaskTag {
  WORK = 'WORK',
  STUDY = 'STUDY',
  HOME = 'HOME',
}

export class CreateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(40)
  @Length(2, 40)
  @StartsWith('Task:')
  title: string;

  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  priority: number;

  @IsArray()
  @IsEnum(TaskTag, { each: true, message: 'Недопустимое значение тэга' })
  @IsOptional()
  tags: TaskTag[];
}
