import chalk from "chalk";
import * as chokidar from "chokidar";
import * as express from "express";
import * as fs from "fs-extra";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import { DIST_DIR, ROOT_DIR } from "../config/paths";
import clientConfig from "../config/webpack/webpack.config.client";
import serverConfig from "../config/webpack/webpack.config.server";
import logger from "../logger";

const PORT = Number(process.env.PORT) || 3000;

(clientConfig.entry as string[]).unshift(
  "webpack-hot-middleware/client?noInfo=true"
);
clientConfig.plugins!.push(new webpack.HotModuleReplacementPlugin());

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);
const compilers = [clientCompiler, serverCompiler];
const initializedCompilers: Set<string> = new Set();
const isAllInitialized = () => initializedCompilers.size === compilers.length;

for (const compiler of compilers) {
  compiler.hooks.compile.tap(compiler.name, () => {
    logger.clear();
    logger.wait(`${compiler.name} building...`);
  });

  compiler.hooks.done.tap(compiler.name, stats => {
    logger.clear();
    logger.done(`${compiler.name} build completed\n`);

    if (stats.hasErrors()) {
      logger.error(`${stats.toJson().errors}\n`);
    }

    if (!initializedCompilers.has(compiler.name)) {
      initializedCompilers.add(compiler.name);

      if (isAllInitialized()) {
        logger.info(
          `Listening on ${chalk.green.underline(`http://localhost:${PORT}\n`)}`
        );
      }
    }
  });
}

const watchCopy = () => {
  const reDotfile = /(^|[\/\\])\../;
  const watcher = chokidar.watch(`${ROOT_DIR}/static`, {
    ignored: reDotfile,
    ignoreInitial: true
  });

  watcher.on("all", async (e, path) => {
    const distPath = path.replace(`${ROOT_DIR}/static`, `${DIST_DIR}/public`);

    switch (e) {
      case "add":
      case "addDir":
      case "change":
        await fs.copy(path, distPath);
        logger.info(`Copied: ${path} -> ${distPath}`);
        break;
      case "unlink":
      case "unlinkDir":
        await fs.remove(distPath);
        logger.info(`Removed: ${distPath}`);
        break;
      default:
        break;
    }
  });
};

const watchBuild = () => {
  serverCompiler.watch({ ignored: /node_modules/ }, () => {
    const deletedIds = Object.keys(require.cache)
      .filter(id => id.indexOf(`${DIST_DIR}/`) === 0)
      .filter(id => delete require.cache[id]);

    if (deletedIds.length) {
      logger.info("Server cache cleared");
    }
  });
};

const serve = () => {
  const server = express();

  server.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output!.publicPath!,
      logLevel: "silent"
    })
  );

  server.use(webpackHotMiddleware(clientCompiler, { log: false }));

  // Include app routes as a middleware
  server.use((req, res, next) => {
    try {
      const app = require(`${DIST_DIR}/server`).default;

      app(req, res, next);
    } catch (err) {
      logger.error(err.stack);
    }
  });

  server.listen(PORT);
};

const dev = async () => {
  if (!fs.existsSync(DIST_DIR)) {
    await require("./build").default();
  }

  watchCopy();
  watchBuild();
  serve();
};

export default dev;
