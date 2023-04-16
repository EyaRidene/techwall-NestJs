import { Controller, Get, Header } from "@nestjs/common";
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Header('Cache-Control', 'none') //To specify a custom response header, you can either use a @Header() decorator or a library-specific response object (and call res.header() directly).
  getHello(): string {
    console.log(
      'Le port de l application : ',
      this.configService.get('APP_PORT'),
    );
    return this.appService.getHello();
  }
}
