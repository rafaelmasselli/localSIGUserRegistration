import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Projeto de cadastro localsig')
    .setDescription(
      'O projeto consiste em um sistema de cadastro que realiza a validação do usuário por meio do email e do telefone, utilizando confirmação via email e SMS, respectivamente. Após a confirmação bem-sucedida do email e do telefone, o cadastro do usuário estará pronto para funcionar normalmente.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
}
bootstrap();
