import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
