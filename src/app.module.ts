import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middelwares/first/first.middleware';
import { logger } from './middelwares/first/logger.middelware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvModule } from './cv/cv.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    PremierModule,
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(logger) //appliquer le middelware logger pour toutes les routes de l'application
      .forRoutes('')
      .apply(FirstMiddleware) // on va spécifier les routes ou on veut appliques les middelwares
      .forRoutes(
        'hello',
        { path: 'todo', method: RequestMethod.GET },
        { path: 'todo*', method: RequestMethod.DELETE },
      );
  }
}
