import { createLogger } from 'bunyan';

export const logger = createLogger({
  name: "music-app",
  streams: [
    {
      level: "info",
      stream: process["stdout"]
    }
  ]
});