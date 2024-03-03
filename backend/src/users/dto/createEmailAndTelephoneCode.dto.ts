import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmailAndTelephoneCodeDto {
  @IsString({ message: "The 'telephone' field must be a string." })
  @IsNotEmpty({ message: "The 'telephone' field cannot be null." })
  @ApiProperty({
    example: '32231121323',
    description: `Telefone do usuário`,
  })
  telephone: string;

  @IsString({ message: "The 'email' field must be a string." })
  @IsNotEmpty({ message: "The 'email' field cannot be null." })
  @ApiProperty({
    example: 'email@emailexemple.com',
    description: `Email do usuário`,
  })
  email: string;
}
