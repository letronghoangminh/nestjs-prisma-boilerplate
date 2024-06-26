import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);

  app.use('/health', (_req, res) => {
    res.sendStatus(200);
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Prisma Boilerplate')
    .setDescription('NestJS Prisma Boilerplate API Documentation')
    .setVersion('1.0')
    .setContact(
      'Minh',
      'https://www.linkedin.com/in/psycholog1st/',
      'letronghoangminh@gmail.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(
    `api/${configService.get('swagger.docsUrl')}`,
    app,
    document,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(configService.get('app.port'), '0.0.0.0');
}
bootstrap();
