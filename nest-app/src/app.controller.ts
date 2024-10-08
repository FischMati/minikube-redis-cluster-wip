import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { MongodbService } from './mongodb/mongodb.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
    private readonly mongodbService: MongodbService) { }

  @Get()
  async getHello(): Promise<string> {
    await this.redisService.ping();
    await this.mongodbService.getReplicaSetInfo();
    return this.appService.getHello();
  }
}
