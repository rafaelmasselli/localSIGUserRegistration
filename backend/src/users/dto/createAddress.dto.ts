import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: "The 'zipCode' field must be a string." })
  @IsNotEmpty({ message: "The 'zipCode' field cannot be null." })
  zipCode: string;

  @IsString({ message: "The 'street' field must be a string." })
  @IsNotEmpty({ message: "The 'street' field cannot be null." })
  street: string;

  @IsNumber()
  @IsNotEmpty({ message: "The 'number' field cannot be null." })
  number: number;

  @IsString({ message: "The 'neighborhood' field must be a string." })
  @IsNotEmpty({ message: "The 'neighborhood' field cannot be null." })
  neighborhood: string;
}
