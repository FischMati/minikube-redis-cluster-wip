import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { MongodbService } from './mongodb/mongodb.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
