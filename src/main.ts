import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req: Request, res: Response, next) => {
    // le middelware le premier à s'exécuter
    console.log('C est le main middelware !');
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //: supprimer les propriétés zeydin
      forbidNonWhitelisted: true, //bich ya3tini message d'erreur
    }),
  );
  await app.listen(3000);
}
bootstrap();
