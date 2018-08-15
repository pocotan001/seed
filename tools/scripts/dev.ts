import chalk from "chalk";
import * as chokidar from "chokidar";
import * as express from "express";
import * as fs from "fs-extra";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import { DIST_DIR, ROOT_DIR } from "../config/paths";
import origClientConfig from "../config/webpack/webpack.config.client";
import serverConfig from "../config/webpack/webpack.config.server";
import log from "../logger";

const PORT = Number(process.env.PORT) || 3000;

const clientConfig: webpack.Configuration = {
  ...origClientConfig,
  entry: [
    "webpack-hot-middleware/client?noInfo=true",
    ...(origClientConfig.entry as string[])
  ],
  plugins: [
    ...origClientConfig.plugins!,
    new webpack.HotModuleReplacementPlugin()
  ]
};

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);
const compilers = [clientCompiler, serverCompiler];
const reDotfile = /(^|[\/\\])\../;

const watchCopy = () => {
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
        log.info(`Copied: ${path} -> ${distPath}`);
        break;
      case "unlink":
      case "unlinkDir":
        await fs.remove(distPath);
        log.info(`Removed: ${distPath}`);
        break;
      default:
        break;
    }
  });
};

const watchServerBuild = () => {
  serverCompiler.watch({ ignored: /node_modules/ }, () => {
    const deletedIds = Object.keys(require.cache)
      .filter(id => id.indexOf(`${DIST_DIR}/`) === 0)
      .filter(id => delete require.cache[id]);

    if (deletedIds.length) {
      log.info("Server cache cleared");
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
      const app = require("../../dist/server").default;

      app(req, res, next);
    } catch (err) {
      log.error(err.stack);
    }
  });

  server.listen(PORT);
};

const waitForFirstBuild = (): Promise<void> =>
  new Promise(resolve => {
    const completed: Set<string> = new Set();
    let isFirstBuildCompleted = false;

    for (const compiler of compilers) {
      compiler.hooks.done.tap(compiler.name, stats => {
        if (isFirstBuildCompleted) {
          return;
        }

        if (stats.hasErrors()) {
          log.error(`${stats.toJson().errors}\n`);
        }

        completed.add(compiler.name);

        if (completed.size === compilers.length) {
          isFirstBuildCompleted = true;
          resolve();
        }
      });
    }
  });

const startLogging = () => {
  for (const compiler of compilers) {
    compiler.hooks.compile.tap(compiler.name, () => {
      log.clear();
      log.wait(`${compiler.name} building...`);
    });

    compiler.hooks.done.tap(compiler.name, stats => {
      log.clear();
      log.done(`${compiler.name} build completed\n`);

      if (stats.hasErrors()) {
        log.error(`${stats.toJson().errors}\n`);
      }
    });
  }
};

const dev = async () => {
  if (!fs.existsSync(DIST_DIR)) {
    await require("./build").default();
  }

  watchCopy();
  watchServerBuild();
  serve();
  await waitForFirstBuild();
  startLogging();

  log.info(
    `Listening on ${chalk.green.underline(`http://localhost:${PORT}\n`)}`
  );
};

export default dev;
