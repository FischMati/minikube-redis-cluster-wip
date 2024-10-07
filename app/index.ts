import express from "express"
import { createServer } from "http"
import { RedisCluster } from "./redis-cluster";
import { MongoDB } from "./MongoDB";


async function main() {
  const cluster = new RedisCluster();
  await cluster.ping();

  const dbSet = new MongoDB();
  await dbSet.getReplicaSetInfo();

  const app = express();

  app.get("", (req, res) => {
    res.write('Hello World! 333'); //write a response to the client
    res.end(); //end the response
  })

  const server = createServer(app);

  server.listen(8080, () => {
    console.log("listening!");
  })
}

main().catch((err) => console.error(err));
