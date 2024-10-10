import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSchema } from './search.model';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

const DEFAULT_URI = 'mongodb://mongodb-raw-queries.mongodbrq.svc.cluster.local:27017';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || DEFAULT_URI
    ),
    MongooseModule.forFeature([{ name: 'Search', schema: SearchSchema }]), // Define los modelos a usar.
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule { }
