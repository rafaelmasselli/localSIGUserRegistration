import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailAndPhoneVerificationCodeDto {
  @IsString({ message: "The 'emailCode' field must be a string." })
  @IsNotEmpty({ message: "The 'emailCode' field cannot be null." })
  @ApiProperty({
    example: '1234567',
    description: `Código que sera enviado para o email inserido`,
  })
  emailCode: string;

  @ApiProperty({
    example: 'FSGDWSDF',
    description: `Código que sera enviado para o telefone inserido`,
  })
  @IsString({ message: "The 'phoneCode' field must be a string." })
  @IsNotEmpty({ message: "The 'phoneCode' field cannot be null." })
  phoneCode: string;

  @ApiProperty({
    example: 'radon_id',
    description: `Id da tabela de código de verificação`,
  })
  @IsString({ message: "The 'phoneCode' field must be a string." })
  @IsNotEmpty({ message: "The 'phoneCode' field cannot be null." })
  id: string;
}
