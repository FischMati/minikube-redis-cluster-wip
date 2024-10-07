import Redis, { Cluster } from "ioredis";
import logger from "./logger";

const DEFAULT_HOST = "my-redis-cluster-headless.redis.svc.cluster.local";
const DEFAULT_PORT = 6379;

export class RedisCluster {
  private redis: Cluster;

  constructor(private host = DEFAULT_HOST, private port = DEFAULT_PORT) {
    this.redis = new Redis.Cluster([
      {
        host,
        port
      }
    ])
  }

  public async getInstance() {
    if (this.redis.status !== 'ready' && this.redis.status !== 'connecting') {
      await this.connect();
    }

    return this.redis;
  }

  async connect() {
    try {
      await this.redis.connect();
      const clusterInfo = await this.redis.call('CLUSTER', ['INFO']);
      logger.info('Redis Cluster Info:\n' + clusterInfo);
    } catch (error) {
      logger.error("Redis connection failed:", error);
      throw error;
    }
  }

  public async ping() {
    const instance = await this.getInstance();

    const res = await instance.ping();
    logger.info('Redis Cluster Ping: ' + res);
  }
}