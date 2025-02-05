/* eslint-disable import/first */
import { serviceConfig } from './config/index.js';

serviceConfig;
import express from 'express';
import { routeMap } from './route/index.js';
import { responseHandler } from './middleware/responseHandler.js';
import { debugLogger } from './middleware/debug.js';
// import { mongoConnection } from './db/mongo/connection/index.js';

const app = express();
const PORT = process.env.PORT || 3005;

async function main() {
  try {
    app.use(express.json({ limit: '30mb', extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(debugLogger);
    app.use(responseHandler);

    // await mongoConnection.init();

    app.get('/ping', (req, res) => {
      return res.success('Server is working fine.', { timestamp: Date.now() });
    });

    app.use('/shorten-url', routeMap);

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.info('App is listening on PORT:', PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
