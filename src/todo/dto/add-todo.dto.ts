import { IsNotEmpty, IsString, MinLength, MaxLength} from "class-validator";

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La taille minimale du champs name est de 6 caratères !',
  })
  @MaxLength(25, {
    message: 'La taille maximale du champs name est de 25 caratères !',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
