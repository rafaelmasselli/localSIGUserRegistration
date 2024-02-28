import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmEmailAndPhoneVerificationCodeDto {
  @IsString({ message: "The 'emailCode' field must be a string." })
  @IsNotEmpty({ message: "The 'emailCode' field cannot be null." })
  emailCode: string;

  @IsString({ message: "The 'phoneCode' field must be a string." })
  @IsNotEmpty({ message: "The 'phoneCode' field cannot be null." })
  phoneCode: string;
}
