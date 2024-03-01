import {
  Body,
  ConflictException,
  Controller,
  Post,
  NotFoundException,
  Res,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateAddressDto,
  CreateEmailAndTelephoneCodeDto,
  ConfirmEmailAndPhoneVerificationCodeDto,
  IdDto,
} from './dto/';
import { validateCpf } from 'src/util/validateCpf';
import * as nodemailer from 'nodemailer';
import axios from 'axios';
import { emailHtml } from 'src/util/emailHTML';
import {
  generateRandomNumber,
  generateRandomString,
} from 'src/util/generateRandomCode';

import * as twilio from 'twilio';
import { Response } from 'express';

const client = twilio(
  process.env.SERVICE_TWILIO_ACCOUNT_SID,
  process.env.SERVICE_TWILIO_AUTH_TOKEN,
);

@Controller('user')
export class UsersController {
  email: string;
  confirmedCode: boolean;
  telephone: string;
  constructor(private usersService: UsersService) {}

  @Get('/')
  async findManyUser() {
    return await this.usersService.findManyUSers();
  }

  @Get('/codes')
  async findManyCodes() {
    return await this.usersService.findManyCodes();
  }

  @Post('/create')
  async createUser(
    @Body() createUser: CreateUserDto,
    @Body() createAddress: CreateAddressDto,
    @Body() idDto: IdDto,
    @Res() res: Response,
  ) {
    const { cpf, maritalStatus } = createUser;
    const { cep } = createAddress;
    const { id } = idDto;

    if (!id) throw new NotFoundException('Id field cannot be empty');

    const emailAndTelephone =
      await this.usersService.findUniqueByIdAccessCode(id);

    if (!emailAndTelephone)
      return res.status(400).json({
        message: 'incorrect user id',
      });

    const email = emailAndTelephone.email;
    const phone = emailAndTelephone.phone;

    const registeredEmail = await this.usersService.findUniqueEmail(email);
    const registeredCpf = await this.usersService.findUniqueCpf(cpf);

    const allowedMaritalStatus = [
      'Single',
      'Married',
      'Separated',
      'Divorced',
      'Widowed',
    ];

    const matchCpf = validateCpf(cpf);

    const resultZipCodeConsultation = await axios.get(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    const resultCep = resultZipCodeConsultation.data;

    const uf = resultCep.uf;
    const city = resultCep.localidade;

    if (!uf || !city) throw new NotFoundException('Incorrect zip code');
    else if (!emailAndTelephone.confirmedCode)
      throw new NotFoundException(
        'Confirm the phone and email code before continuing registration',
      );
    else if (!allowedMaritalStatus.includes(maritalStatus))
      throw new ConflictException(
        `The marital status ${maritalStatus} is not allowed`,
      );
    else if (!matchCpf) throw new ConflictException('Invalid cpf');
    else if (registeredEmail)
      throw new ConflictException('E-mail already registered');
    else if (registeredCpf)
      throw new ConflictException('CPF already registered');

    await this.usersService
      .createUserWithAddress(
        createUser,
        createAddress,
        { email, phone },
        { uf, city },
      )
      .then(async () => {
        await this.usersService
          .deleteCodeAccessById(id)
          .catch((err) => {
            return res.status(500).json({
              message: err.message,
            });
          })
          .then(() => {
            return {
              message: 'User created successfully',
            };
          });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  }
  @Post('/confirm/code')
  async ConfirmCode(
    @Body()
    confirmEmailAndPhoneVerificationCodeDto: ConfirmEmailAndPhoneVerificationCodeDto,
    @Res() res: Response,
  ) {
    const { emailCode, phoneCode, id } =
      confirmEmailAndPhoneVerificationCodeDto;

    const codes = await this.usersService.findUniqueByIdAccessCode(id);

    if (codes.telephoneCode !== phoneCode)
      throw new NotFoundException('Invalid code');
    else if (codes.emailCode !== emailCode)
      throw new NotFoundException('Invalid code');
    else {
      await this.usersService.updateConfirmationCode(id);
    }
    return res.status(200).json({
      message: 'Code confirmed',
    });
  }

  @Post('/create/code')
  async CreateEmailCodeAndPhoneCode(
    @Body()
    createEmailAndTelephoneCodeDto: CreateEmailAndTelephoneCodeDto,
    @Res() res: Response,
  ) {
    const { telephone, email } = createEmailAndTelephoneCodeDto;
    const emailCode = generateRandomNumber();
    const telephoneCode = generateRandomString();
    const registeredEmail = await this.usersService.findUniqueEmail(email);

    const accessCodeByEmail =
      await this.usersService.findUniqueByEmailAccessCode(email);

    const accessCodeByTelephone =
      await this.usersService.findUniqueByTelephoneAccessCode(telephone);

    if (accessCodeByEmail) {
      await this.usersService.deleteCodeAccessByEmail(email);
    }

    if (accessCodeByTelephone) {
      await this.usersService.deleteCodeAccessByTelephone(telephone);
    }
    if (registeredEmail)
      return res.status(409).json({
        message: 'User already registered',
      });

    const existingConfirmationCode =
      await this.usersService.findUniqueByEmailAccessCode(email);

    if (existingConfirmationCode) {
      await this.usersService.deleteCodeAccessByEmail(email);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Código de verificação',
      html: emailHtml(emailCode),
    };

    await transporter.sendMail(mailOptions);

    await client.messages.create({
      body: `Seu código de verificação é: ${telephoneCode}`,
      from: '+14242901254',
      to: `+${telephone}`,
    });

    await this.usersService
      .createEmailAndCellPhoneCode(
        { email, telephone },
        { emailCode, telephoneCode },
      )
      .then((result) => {
        const userId = result.id;
        return res.status(200).json({
          id: userId,
          message: `The phone and email verification code has been sent, copy the ID to confirm the phone and email`,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  }
}