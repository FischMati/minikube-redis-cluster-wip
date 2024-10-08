import { Injectable } from '@nestjs/common';
import { MongodbService } from './mongodb/mongodb.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService,
    private readonly mongodbService: MongodbService) { }

  async getHello(): Promise<string> {
    await this.redisService.ping();
    await this.mongodbService.getReplicaSetInfo();
    return 'Hello World!';
  }
}
