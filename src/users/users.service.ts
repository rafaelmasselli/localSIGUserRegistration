import {
  CreateUserDto,
  CreateAddressDto,
  CreateEmailAndTelephoneCodeDto,
} from './dto';
import { Body, Injectable } from '@nestjs/common';
import { User, ConfirmationCodes } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface ICodes {
  emailCode: string;
  telephoneCode: string;
}

@Injectable()
export class UsersService {
  constructor(private database: PrismaService) {}
  async findUniqueEmail(@Body() email: string): Promise<User> {
    return await this.database.user.findUnique({
      where: { email },
    });
  }

  async findUniqueCpf(@Body() cpf: string): Promise<User> {
    return await this.database.user.findUnique({
      where: { cpf },
    });
  }

  async createEmailAndCellPhoneCode(
    @Body() createEmailAndTelephoneCodeDto: CreateEmailAndTelephoneCodeDto,
    { emailCode, telephoneCode }: ICodes,
  ): Promise<ConfirmationCodes> {
    const { email, telephone } = createEmailAndTelephoneCodeDto;

    return await this.database.confirmationCodes.create({
      data: {
        email,
        emailCode,
        phone: telephone,
        telephoneCode,
      },
    });
  }

  async findUniqueAccessCode(email: string) {
    return await this.database.confirmationCodes.findUnique({
      where: { email },
    });
  }

  async deleteCodeAccess(email: string) {
    return await this.database.confirmationCodes.delete({
      where: { email },
    });
  }

  async createUserWithAddress(
    @Body() createUser: CreateUserDto,
    @Body() createAddress: CreateAddressDto,
  ) {
    // return await this.database.user.create({
    //   data: {
    //     ...createUser,
    //     address: {
    //       create: {
    //         ...createAddress,
    //       },
    //     },
    //   },
    // });

    return { createAddress, createUser };
  }
}
