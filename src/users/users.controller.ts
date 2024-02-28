import {
  Body,
  ConflictException,
  Controller,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateAddressDto,
  CreateEmailAndTelephoneCodeDto,
  ConfirmEmailAndPhoneVerificationCodeDto,
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

const client = twilio(
  process.env.SERVICE_TWILIO_ACCOUNT_SID,
  process.env.SERVICE_TWILIO_AUTH_TOKEN,
);

@Controller('user')
export class UsersController {
  email: string;
  confirmedCode: boolean;
  telephone: string;
  constructor(private usersService: UsersService) {
    this.email = null;
    this.confirmedCode = false;
    this.telephone = null;
  }

  @Post('/create/user/confirm/code')
  async createUser(
    @Body() createUser: CreateUserDto,
    @Body() createAddress: CreateAddressDto,
  ) {
    const { cpf, maritalStatus } = createUser;
    const { cep, city, uf } = createAddress;

    const registeredEmail = await this.usersService.findUniqueEmail(this.email);
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

    if (this.confirmedCode)
      throw new NotFoundException(
        'Confirm the phone and email code before continuing registration',
      );
    else if (!allowedMaritalStatus.includes(maritalStatus))
      throw new ConflictException(
        `The marital status ${maritalStatus} is not allowed`,
      );
    else if (resultCep.uf !== uf)
      throw new ConflictException(
        'The uf is not the same uf as the indicated zip code',
      );
    else if (resultCep.localidade !== city)
      throw new ConflictException(
        'The city is not the same as the city of the indicated zip code',
      );
    else if (!matchCpf) throw new ConflictException('Invalid cpf');
    else if (registeredEmail)
      throw new ConflictException('E-mail already registered');
    else if (registeredCpf)
      throw new ConflictException('CPF already registered');

    return await this.usersService.createUserWithAddress(
      createUser,
      createAddress,
    );
  }
  @Post('/confirm/code')
  async ConfirmCode(
    @Body()
    confirmEmailAndPhoneVerificationCodeDto: ConfirmEmailAndPhoneVerificationCodeDto,
  ) {
    const { emailCode, phoneCode } = confirmEmailAndPhoneVerificationCodeDto;

    const codes = await this.usersService.findUniqueAccessCode(this.email);

    if (codes.telephoneCode !== phoneCode)
      throw new NotFoundException('Invalid code');
    else if (codes.emailCode !== emailCode)
      throw new NotFoundException('Invalid code');
    else {
      this.confirmedCode = true;
    }

    return {
      message: 'Code confirmed',
      statusCode: 200,
    };
  }

  @Post('/create/code')
  async CreateEmailCodeAndPhoneCode(
    @Body()
    createEmailAndTelephoneCodeDto: CreateEmailAndTelephoneCodeDto,
  ) {
    const { telephone, email } = createEmailAndTelephoneCodeDto;
    const emailCode = generateRandomNumber();
    const telephoneCode = generateRandomString();

    const accessCode = this.usersService.findUniqueAccessCode(email);
    if (accessCode) await this.usersService.deleteCodeAccess(email);

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

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return {
        statusCode: 400,
        message: 'invalid email',
        error: error.message,
      };
    }

    try {
      await client.messages.create({
        body: `Seu código de verificação é: ${telephoneCode}`,
        from: '+14242901254',
        to: `+${telephone}`,
      });
    } catch (error) {
      return {
        statusCode: 400,
        message: 'invalid phone number',
        error: error.message,
      };
    }

    try {
      await this.usersService.createEmailAndCellPhoneCode(
        { email, telephone },
        { emailCode, telephoneCode },
      );
    } catch {
      return {
        statusCode: 500,
        message: 'Error creating code',
      };
    }

    this.email = email;
    this.telephone = telephone;

    return {
      statusCode: 200,
      message: 'Phone and email verification code has been sent',
    };
  }
}
