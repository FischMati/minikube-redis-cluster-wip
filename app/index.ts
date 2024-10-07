import express from "express"
import { createServer } from "http"
import Redis from "ioredis";

const connectToCluster = () => {
  const redis = new Redis.Cluster(
    [
      {
        host: 'my-redis-cluster-headless.redis.svc.cluster.local', // Use the full DNS name if in a different namespace
        port: 6379,
      },
    ],
    {
      dnsLookup: (address, callback) => callback(null, address),
      redisOptions: {
        // If you have a password set, include it here
        // password: 'your_secure_password',
      },
    }
  );

  // Test the connection
  redis.on('connect', async () => {
    try {
      // Execute the CLUSTER INFO command
      const clusterInfo = await redis.call('CLUSTER', ['INFO']);
      console.log('Redis Cluster Info:\n', clusterInfo);
    } catch (err) {
      console.error('Error fetching cluster info:', err);
    }

    // You can also list cluster nodes
    try {
      const clusterNodes = await redis.call('CLUSTER', ['NODES']);
      console.log('Redis Cluster Nodes:\n', clusterNodes);
    } catch (err) {
      console.error('Error fetching cluster nodes:', err);
    }
  });

  redis.on('error', (err) => {
    console.error('Redis Cluster Error:', err);
  });

  redis.ping((err, result) => {
    if (err) {
      console.error('Error connecting to Redis:', err);
    } else {
      console.log('Connected to Redis:', result); // Debe mostrar "PONG"
    }
  });
}


async function main() {
  connectToCluster();

  const app = express();

  app.get("", (req, res) => {
    res.write('Hello World! 333'); //write a response to the client
    res.end(); //end the response
  })

  const server = createServer(app);

  server.listen(8080, () => {
    console.log("listening! asdasd");
  })

  console.log("corrido");
}

main().catch((err) => console.error(err));
