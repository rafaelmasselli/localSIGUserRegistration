import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: "The 'cep' field must be a string." })
  @IsNotEmpty({ message: "The 'cep' field cannot be null." })
  cep: string;

  @IsString({ message: "The 'street' field must be a string." })
  @IsNotEmpty({ message: "The 'street' field cannot be null." })
  street: string;
}
