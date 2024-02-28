import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: "The 'address' field must be a string." })
  @IsNotEmpty({ message: "The 'address' field cannot be null." })
  address: string;

  @IsString({ message: "The 'cep' field must be a string." })
  @IsNotEmpty({ message: "The 'cep' field cannot be null." })
  cep: string;

  @IsString({ message: "The 'street' field must be a string." })
  @IsNotEmpty({ message: "The 'street' field cannot be null." })
  street: string;

  @IsString({ message: "The 'city' field must be a string." })
  @IsNotEmpty({ message: "The 'city' field cannot be null." })
  city: string;

  @IsString({ message: "The 'uf' field must be a string." })
  @IsNotEmpty({ message: "The 'uf' field cannot be null." })
  uf: string;
}
