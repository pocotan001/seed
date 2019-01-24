import consola from "consola";
import { Application } from "./Application";

interface Server {
  start(port: number): Promise<void>;
}

const createServer = (app: Application): Server => ({
  start(port) {
    return new Promise(resolve => {
      app.listen(port, () => {
        consola.info(`Listening on port ${port}`);
        resolve();
      });
    });
  }
});

export default createServer;
