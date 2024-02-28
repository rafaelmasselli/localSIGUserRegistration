import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The field 'name' cannot be null." })
  fullName: string;

  @IsString({ message: "The 'birthDate' field must be a string." })
  @IsNotEmpty({ message: "The 'birthDate' field cannot be null." })
  birthDate: string;

  @IsString({ message: "The 'cpf' field must be a string." })
  @IsNotEmpty({ message: "The 'cpf' field cannot be null." })
  cpf: string;

  @IsString({ message: "The 'maritalStatus' field must be a string." })
  @IsNotEmpty({ message: "The 'maritalStatus' field cannot be null." })
  maritalStatus: string;

  @IsInt({ message: "The 'age' field must be an integer." })
  @IsNotEmpty({ message: "The 'age' field cannot be null." })
  age: number;
}
