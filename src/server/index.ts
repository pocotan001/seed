import config from "~/config";
import createLogger from "~/infrastructure/logger";
import app from "./app";

// HACK: `require.main === module` does not work on webpack...
// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (config.isProd) {
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

  app.listen(PORT, () => {
    log.info(`Listening on ${PORT}`);
  });
}

export default app;
