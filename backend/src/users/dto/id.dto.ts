import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class IdDto {
  @IsString({ message: "The 'name' field must be a string." })
  @IsNotEmpty({ message: "The field 'name' cannot be null." })
  @ApiProperty({
    example: 'ajogpadpvinamandkv',
    description: `id`,
  })
  id: string;
}
