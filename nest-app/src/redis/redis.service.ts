import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Redis, { Cluster } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);
  private redis: Cluster;

  private readonly DEFAULT_HOST = "my-redis-cluster-headless.redis.svc.cluster.local";
  private readonly DEFAULT_PORT = 6379;

  constructor() {
    this.redis = new Redis.Cluster([
      {
        host: process.env.REDIS_HOST || this.DEFAULT_HOST,
        port: Number(process.env.REDIS_PORT) || this.DEFAULT_PORT,
      },
    ]);
  }

  async onModuleInit() {
    if (this.redis.status !== 'ready' && this.redis.status !== 'connecting') {
      await this.connect();
    } else {
      await this.printClusterInfo();
    }
  }

  private async connect() {
    try {
      await this.redis.connect();
      await this.printClusterInfo();
    } catch (error) {
      this.logger.error('Redis connection failed:', error);
      throw error;
    }
  }

  private async printClusterInfo() {
    const clusterInfo = await this.redis.call('CLUSTER', ['INFO']);
    this.logger.log('Redis Cluster Info:\n' + clusterInfo);
  }

  public async ping() {
    const res = await this.redis.ping();
    this.logger.log('Redis Cluster Ping: ' + res);
  }
}