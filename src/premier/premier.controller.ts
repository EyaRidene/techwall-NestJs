import { Controller } from '@nestjs/common';
import { Delete, Post, Put, Get } from '@nestjs/common/decorators';

@Controller('premier')
export class PremierController {
  @Get('get')
  getMethod(): string {
    console.log('get method');
    return 'get method ';
  }
  @Post('get')
  postMethod(): string {
    console.log('POST method');
    return 'add method ';
  }
  @Delete('get')
  deleteMethod(): string {
    console.log('delete method');
    return 'delete method ';
  }
  @Put('get')
  putMethod(): string {
    console.log('put method');
    return 'update method ';
  }
}
