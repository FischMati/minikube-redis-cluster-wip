import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';


const DEFAULT_URI = 'mongodb://my-mongodb-headless.mongodb.svc.cluster.local:27017/?replicaSet=rs0&directConnection=false';


@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || DEFAULT_URI
    ),
  ],
  providers: [MongodbService],
  exports: [MongodbService]
})
export class MongodbModule { }
