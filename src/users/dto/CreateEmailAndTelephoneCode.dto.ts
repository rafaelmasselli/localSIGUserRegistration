import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmailAndTelephoneCodeDto {
  @IsString({ message: "The 'telephone' field must be a string." })
  @IsNotEmpty({ message: "The 'telephone' field cannot be null." })
  telephone: string;

  @IsString({ message: "The 'email' field must be a string." })
  @IsNotEmpty({ message: "The 'email' field cannot be null." })
  email: string;
}
