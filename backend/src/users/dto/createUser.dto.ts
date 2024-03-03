import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The field 'name' cannot be null." })
  @ApiProperty({
    example: 'Carlos oliveira',
    description: `Nome completo do usuário`,
  })
  fullName: string;

  @IsString({ message: "The 'birthDate' field must be a string." })
  @IsNotEmpty({ message: "The 'birthDate' field cannot be null." })
  @ApiProperty({
    example: '2003-01-01',
    description: `Data de nascimento do usuário`,
  })
  birthDate: string;

  @IsString({ message: "The 'cpf' field must be a string." })
  @IsNotEmpty({ message: "The 'cpf' field cannot be null." })
  @ApiProperty({
    example: '431.312.132-23',
    description: `Cpf do usuário  `,
  })
  cpf: string;

  @IsString({ message: "The 'maritalStatus' field must be a string." })
  @ApiProperty({
    example: 'single',
    description: `Estado civil do usuário`,
  })
  @IsNotEmpty({ message: "The 'maritalStatus' field cannot be null." })
  maritalStatus: string;

  @IsInt({ message: "The 'age' field must be an integer." })
  @ApiProperty({
    example: '20',
    description: `Idade do usuário`,
  })
  @IsNotEmpty({ message: "The 'age' field cannot be null." })
  age: number;
}
