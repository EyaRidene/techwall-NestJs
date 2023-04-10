import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';
import * as dotenv from 'dotenv'; // la 1ere methode avec : npm i dotenv la 2eme c'est avec
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  dotenv.config(); //la methode qui va lancer le chargement des fichiers importer
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
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
  app.useGlobalInterceptors(new DurationInterceptor()); //appliquer l'intercepteur pour toutesss les requetes de l'application
  // await app.listen(process.env.APP_PORT);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
