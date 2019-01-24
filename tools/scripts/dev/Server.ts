import chalk from "chalk";
import { Application } from "express";
import log from "../../lib/logger";

export interface Server {
  start(port: number): Promise<void>;
}

const createServer = (app: Application): Server => ({
  start(port) {
    return new Promise(resolve => {
      app.listen(port, () => {
        log.info(
          `Listening on ${chalk.green.underline(`http://localhost:${port}\n`)}`
        );
        resolve();
      });
    });
  }
});

export default createServer;
