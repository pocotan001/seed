import consola from "consola";
import createApplication from "./Application";
import createConfig from "./Config";
import createRouter from "./Router";
import createServer from "./Server";

const config = createConfig();
const router = createRouter(config);
const app = createApplication(config, router);

process.on("unhandledRejection", reason => {
  throw reason;
});

process.on("uncaughtException", (err: Error) => {
  consola.fatal(`Died with uncaught exception: ${err.stack || err.message}`);
  // The entire application down, App Engine will restart it
  process.exit(1);
});

if (!config.http.inDevServer) {
  const server = createServer(app);

  (async () => {
    try {
      await server.start(config.http.port);
    } catch (err) {
      consola.fatal(err);
      process.exit(1);
    }
  })();
}

export default app;
