import config from "~/config";
import createLogger from "~/infra/logger";
import app from "./app";

const [, , script] = process.argv;
const inDevServer = script === "dev"; // `npm run dev` is running

if (!inDevServer) {
  const PORT = Number(process.env.PORT) || 3000;
  const log = createLogger("[app]");

  process.on("unhandledRejection", reason => {
    throw reason;
  });

  process.on("uncaughtException", (err: Error) => {
    log.error(err.stack);

    process.once("exit", () => {
      // GAE will restart it
      log.info("Died with uncaught exception. Restarting server...");
    });

    process.exit(1);
  });

  log.info("Booting in %o mode", config.env);

  app.listen(PORT, () => {
    log.info(`Listening on %o`, PORT);
  });
}

export default app;
