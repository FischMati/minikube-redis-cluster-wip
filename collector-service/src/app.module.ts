import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';


@Module({
  imports: [MongodbModule, SearchModule],
  controllers: [AppController],
  providers: [AppService, SearchService],
})
export class AppModule { }
