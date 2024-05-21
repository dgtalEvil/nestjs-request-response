import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FreezePipe } from './pipes/freeze.pipe';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseFilters(HttpExceptionFilter)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  // @UseGuards(FreezePipe) //IF we wanna apply FreezePipe on all types of parameter(body, params, query)
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32;
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}
