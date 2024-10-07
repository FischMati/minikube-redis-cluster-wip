const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enable colors
      translateTime: 'yyyy-mm-dd HH:MM:ss', // Format timestamp
      ignore: 'pid,hostname' // Remove unnecessary fields
    }
  }
});

export default logger;