import mongoose, { ConnectionStates, Mongoose } from "mongoose";
import logger from "./logger";

const uri = 'mongodb://my-mongodb-headless.mongodb.svc.cluster.local:27017/?replicaSet=rs0&directConnection=false';

export class MongoDB {
  private db: Mongoose | null = null;

  public async getInstance(): Promise<Mongoose> {
    if (this.db === null ||
      (!(this.db.connection.readyState === ConnectionStates.connecting) &&
        !(this.db.connection.readyState === ConnectionStates.connected))) {
      await this.intitialize();
    }

    return this.db!;
  }

  private async intitialize() {
    try {
      this.db = await mongoose.connect(uri);
      await this.db.connection.asPromise()
      logger.info('Connected to MongoDB replica set');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
    }
  }

  async getReplicaSetInfo() {
    try {
      const instance = await this.getInstance();
      const adminDb = instance.connection.db?.admin();
      const replicaSetStatus = await adminDb?.command({ replSetGetStatus: 1 });
      logger.info('Replica Set Status: ' + JSON.stringify(replicaSetStatus, null, 2));
    } catch (error) {
      logger.error('Error retrieving replica set info:', error);
    }
  }
}