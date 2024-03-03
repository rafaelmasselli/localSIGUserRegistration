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

interface IContacts {
  email: string;
  phone: string;
}

interface IZipCodeLocationApi {
  uf: string;
  city: string;
}

@Injectable()
export class UsersService {
  constructor(private database: PrismaService) {}
  async findUniqueEmail(@Body() email: string): Promise<User> {
    return await this.database.user.findUnique({
      where: { email },
    });
  }

  async deleteUser(id: string) {
    await this.database.address.deleteMany({
      where: { userId: id },
    });
    return await this.database.user.delete({
      where: { id },
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
    const user = await this.database.confirmationCodes.create({
      data: {
        email,
        emailCode,
        phone: telephone,
        telephoneCode,
      },
    });
    return user;
  }

  async findUniqueByIdAccessCode(id: string) {
    return await this.database.confirmationCodes.findUnique({
      where: { id },
    });
  }

  async findUniqueByEmailAccessCode(email: string) {
    return await this.database.confirmationCodes.findUnique({
      where: { email },
    });
  }

  async findUniqueByTelephoneAccessCode(phone: string) {
    return await this.database.confirmationCodes.findUnique({
      where: { phone },
    });
  }
  async deleteCodeAccessByTelephone(telephone: string) {
    return await this.database.confirmationCodes.delete({
      where: { phone: telephone },
    });
  }

  async deleteCodeAccessByEmail(email: string) {
    return await this.database.confirmationCodes.delete({
      where: { email },
    });
  }

  async deleteCodeAccessById(id: string) {
    return await this.database.confirmationCodes.delete({
      where: { id },
    });
  }

  async updateConfirmationCode(id: string) {
    return await this.database.confirmationCodes.update({
      where: { id },
      data: {
        confirmedCode: true,
      },
    });
  }
  async createUserWithAddress(
    @Body() createUser: CreateUserDto,
    @Body() createAddress: CreateAddressDto,
    @Body() { email, phone }: IContacts,
    @Body() { city, uf }: IZipCodeLocationApi,
  ) {
    const { zipCode, street, number, neighborhood } = createAddress;
    const { age, birthDate, cpf, fullName, maritalStatus } = createUser;

    const createdUser = await this.database.user.create({
      data: {
        age,
        birthDate,
        cpf,
        fullName,
        maritalStatus,
        email,
        phone,
        address: {
          create: {
            number,
            city,
            uf,
            zipCode,
            street,
            neighborhood,
          },
        },
      },
    });

    return { user: createdUser };
  }

  async findManyUSers() {
    return await this.database.user.findMany({
      orderBy: {
        dateCreated: 'asc',
      },
      include: {
        address: true,
      },
    });
  }

  async findManyCodes() {
    return await this.database.confirmationCodes.findMany({});
  }
}
