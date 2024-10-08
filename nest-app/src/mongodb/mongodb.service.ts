import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import mongoose, { ConnectionStates, Mongoose } from "mongoose";

@Injectable()
export class MongodbService implements OnModuleInit {
  private readonly logger = new Logger(MongodbService.name);
  private db: Mongoose | null = null;

  private readonly DEFAULT_URI = 'mongodb://my-mongodb-headless.mongodb.svc.cluster.local:27017/?replicaSet=rs0&directConnection=false';

  async onModuleInit() {
    if (this.db === null ||
      (!(this.db.connection.readyState === ConnectionStates.connecting) &&
        !(this.db.connection.readyState === ConnectionStates.connected))) {
      await this.initialize();
    }
  }

  private async initialize() {
    try {
      this.db = await mongoose.connect(process.env.MONGO_URI || this.DEFAULT_URI);
      this.logger.log('Connected to MongoDB replica set');
    } catch (error) {
      this.logger.error('MongoDB connection error:', error);
    }
  }

  async getReplicaSetInfo() {
    try {
      const adminDb = this.db?.connection.db.admin();
      const replicaSetStatus = await adminDb?.command({ replSetGetStatus: 1 });
      this.logger.log('Replica Set Status:', JSON.stringify(replicaSetStatus, null, 2));
    } catch (error) {
      this.logger.error('Error retrieving replica set info:', error);
    }
  }
}