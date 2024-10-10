import { Injectable } from '@nestjs/common';
import { MongodbService } from './mongodb/mongodb.service';

@Injectable()
export class AppService {
  constructor(private readonly mongodbService: MongodbService) { }

  async getHello(): Promise<string> {
    await this.mongodbService.getInfo();
    return 'Hello World!';
  }
}
