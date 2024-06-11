import { createLogger } from 'bunyan';

export const logger = createLogger({
  name: "vicBot-app",
  streams: [
    {
      level: "info",
      stream: process["stdout"]
    }
  ]
});