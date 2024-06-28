// Title: Music Database
// Author: Victor E.
// Description: This app will be used to organize music for all uses.
import config from 'config';
import express, { Request, Response } from 'express';
import next from 'next';
import { logger } from "./logger";

import db from "./db/config/connection";

// We can use config here or process.env
const port = <number>config.get('defaultPort');
const hostname = <string>config.get('hostname');
const dev = <boolean>config.get('dev');
const mappedPaths = <Record<string, string>>config.get('mappedPaths');

console.log("DEV", dev);

const nextApp = next({ dev, dir: '.' });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.use(async (req: Request, res: Response) => {
    try {
      const url = new URL(req.url || '', `http://${req.headers.host}`);

      if (!url) {
        // log here
        const errorMessage = 'No URL provided';
        logger.error({ url }, errorMessage);
        throw new Error(errorMessage);
      }

      // Extract pathname and query parameters from the URL object
      const { pathname, searchParams: query } = url;

      if (!pathname) {
        const errorMessage = 'No path provided';
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Check if the pathname is mapped
      if (pathname in mappedPaths) {
        // If the pathname is mapped, render the corresponding page
        await nextApp.render(req, res, mappedPaths[pathname], Object.fromEntries(query));
      } else {
        // If the pathname is not mapped, delegate to the default handler
        await handle(req, res);
      }
    } catch (err) {
      logger.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  db.once('open', () => {
    app.listen(port, () => {
      logger.info(`📥 Ready on ${hostname}:${port} 🦾`);
    });
  });
}).catch((err) => {
  logger.error('Error occurred during app preparation:', err);
  process.exit(1);
});
