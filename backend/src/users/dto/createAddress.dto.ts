import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: "The 'zipCode' field must be a string." })
  @IsNotEmpty({ message: "The 'zipCode' field cannot be null." })
  @ApiProperty({
    example: 'CEP',
    description: `Localização da cidade`,
  })
  zipCode: string;

  @IsString({ message: "The 'street' field must be a string." })
  @IsNotEmpty({ message: "The 'street' field cannot be null." })
  @ApiProperty({
    example: 'centro',
    description: `Local da moradia`,
  })
  street: string;

  @IsNumber()
  @IsNotEmpty({ message: "The 'number' field cannot be null." })
  @ApiProperty({
    example: '1125',
    description: `Numero da casa`,
  })
  number: number;

  @IsString({ message: "The 'neighborhood' field must be a string." })
  @IsNotEmpty({ message: "The 'neighborhood' field cannot be null." })
  @ApiProperty({
    example: 'Rua santa teresa',
    description: `Nome da rua`,
  })
  neighborhood: string;
}
