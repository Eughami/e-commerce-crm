/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const globalPrefix = `${config.get('GLOBAL_PREFIX') || 'api'}/admin`;
  const host = config.get('DB_HOST') || 'http://localhost';
  const port = config.get('PORT') || 3333;
  const environment = process.env.NODE_ENV;

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce Admin APIs')
    .setDescription('REST APIs for E-Commerce Admin Dashboard')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`${globalPrefix}/swagger`, app, document);

  await app.listen(port, () => {
    Logger.log(`Admin Application running at ${host}:${port}/${globalPrefix}`);
    Logger.log(`Swagger running at ${host}:${port}/${globalPrefix}/swagger`);
    Logger.log(`Running in ${environment} mode`);
  });
}

bootstrap();
