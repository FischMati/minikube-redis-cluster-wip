import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [MongodbModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
