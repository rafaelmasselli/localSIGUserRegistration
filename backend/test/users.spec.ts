import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';
import {
  CreateUserDto,
  CreateAddressDto,
  IdDto,
  CreateEmailAndTelephoneCodeDto,
} from 'src/users/dto';
import { NotFoundException } from '@nestjs/common';
import * as twilio from 'twilio';
const client = twilio(
  process.env.SERVICE_TWILIO_ACCOUNT_SID,
  process.env.SERVICE_TWILIO_AUTH_TOKEN,
);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // describe('createUser', () => {
  //   it('should create a user with valid data', async () => {
  //     // Mock dependencies and set up the scenario
  //     jest.spyOn(usersService, 'findUniqueByIdAccessCode').mockResolvedValue({
  //       id: 'userId',
  //       email: 'test@example.com',
  //       phone: '1234567890',
  //       confirmedCode: true,
  //     } as any);
  //     jest.spyOn(usersService, 'findUniqueEmail').mockResolvedValue(null);
  //     jest.spyOn(usersService, 'findUniqueCpf').mockResolvedValue(null);
  //     jest.spyOn(usersService, 'createUserWithAddress').mockResolvedValue({
  //       user: {
  //         age: 12,
  //         birthDate: '',
  //         cpf: '12345678901',
  //         fullName: '<NAME>',
  //         maritalStatus: 'Single',
  //         email: '<EMAIL>',
  //         phone: '1234567890',
  //         id: '',
  //         dateCreated: undefined,
  //       },
  //     });

  //     const createUserDto: CreateUserDto = {
  //       fullName: 'John Doe',
  //       birthDate: '01-01-1990',
  //       cpf: '123.456.789-09',
  //       maritalStatus: 'Single',
  //       age: 25,
  //     };
  //     const createAddressDto: CreateAddressDto = {
  //       cep: '12345-678',
  //       street: 'Main St',
  //     };
  //     const idDto: IdDto = {
  //       id: 'validId',
  //     };

  //     const result = await usersController.createUser(
  //       createUserDto,
  //       createAddressDto,
  //       idDto,
  //       { status: () => {}, json: (data) => data } as any,
  //     );

  //     expect(result).toEqual({ message: 'User created successfully' });
  //   });

  //   it('should throw NotFoundException for invalid user id', async () => {
  //     jest
  //       .spyOn(usersService, 'findUniqueByIdAccessCode')
  //       .mockResolvedValue(null);
  //     const createUserDto: CreateUserDto = {
  //       fullName: '',
  //       birthDate: '',
  //       cpf: '',
  //       maritalStatus: '',
  //       age: 0,
  //     };
  //     const createAddressDto: CreateAddressDto = {
  //       cep: '',
  //       street: '',
  //     };
  //     const idDto: IdDto = {
  //       id: 'invalidId',
  //     };

  //     await expect(
  //       usersController.createUser(
  //         createUserDto,
  //         createAddressDto,
  //         idDto,
  //         { status: () => {}, json: (data) => data } as any, // Mock Response object
  //       ),
  //     ).rejects.toThrowError(NotFoundException);
  //   });
  // });

  describe('CreateEmailCodeAndPhoneCode', () => {
    let createEmailCodeAndPhoneCode;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [createEmailCodeAndPhoneCode],
      }).compile();

      createEmailCodeAndPhoneCode = moduleRef.get(createEmailCodeAndPhoneCode);
    });

    it('deve criar o código de email e telefone', async () => {
      // Criando os mocks
      jest.mock('nodemailer', () => ({
        createTransport: () => ({
          sendMail: jest.fn().mockResolvedValue(true),
        }),
      }));

      // jest.spyOn(client.messages, 'create').mockResolvedValue({});

      // jest.spyOn(client.messages, 'create').mockResolvedValue(true);

      const createEmailAndTelephoneCodeDto = {
        telephone: '1234567890',
        email: 'teste@teste.com',
      };

      const result =
        await createEmailCodeAndPhoneCode.CreateEmailCodeAndPhoneCode(
          createEmailAndTelephoneCodeDto,
        );

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.message).toBe(
        'The phone and email verification code has been sent, copy the ID to confirm the phone and email',
      );
    });
  });
});
