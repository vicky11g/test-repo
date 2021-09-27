const app = require('./app/index');
const { dbconnect } = require('./db/db.connect');
const envConfig = require('./configs/index');
let { logger } = require('./common/index');

logger = logger('SERVER');

const startServer = () => {
  dbconnect(envConfig.db);
  const port = envConfig.serverPort;
  app.listen(port, () => {
    logger.log('info', `Server running at Port - ${port}`);
  });
}
startServer();