import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty()
  @Length(2, 40)
  title: string;
  @IsBoolean()
  isCompleted: boolean;
}
