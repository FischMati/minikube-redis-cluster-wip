import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { RedisModule } from './redis/redis.module';
import { MongodbService } from './mongodb/mongodb.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [MongodbModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, MongodbService, RedisService],
})
export class AppModule { }
