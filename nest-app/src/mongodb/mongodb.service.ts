import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates, Mongoose } from "mongoose";

@Injectable()
export class MongodbService implements OnModuleInit {
  private readonly logger = new Logger(MongodbService.name);

  constructor(@InjectConnection() private readonly connection: Connection) { }


  async onModuleInit() {
    if (!(this.connection.readyState === ConnectionStates.connecting) &&
      !(this.connection.readyState === ConnectionStates.connected)) {
      await this.initialize();
    } else {
      await this.getReplicaSetInfo();
    }
  }

  private async initialize() {
    try {
      await this.connection.asPromise();
      this.logger.log('Connected to MongoDB replica set');
    } catch (error) {
      this.logger.error('MongoDB connection error:', error);
    }
  }

  async getReplicaSetInfo() {
    try {
      const adminDb = this.connection.db.admin();
      const replicaSetStatus = await adminDb.command({ replSetGetStatus: 1 });
      this.logger.log('Replica Set Status:', JSON.stringify(replicaSetStatus, null, 2));
    } catch (error) {
      this.logger.error('Error retrieving replica set info:', error);
    }
  }
}