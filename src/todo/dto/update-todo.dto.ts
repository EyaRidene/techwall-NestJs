import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
