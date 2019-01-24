import webpack from "webpack";
import log from "../../lib/logger";

export interface ServerCompiler {
  compiler: webpack.Compiler;
  clearCache(): void;
  watch(): webpack.Compiler.Watching;
}

const reNodeModules = /node_modules/;

const createServerCompiler = (
  serverConfig: webpack.Configuration
): ServerCompiler => {
  const compiler = webpack(serverConfig);
  let isFirstBuild = true;

  compiler.hooks.compile.tap(compiler.name, () => {
    if (isFirstBuild) {
      return;
    }

    log.clear();
    log.wait(`${compiler.name} building...\n`);
  });

  compiler.hooks.done.tap(compiler.name, stats => {
    if (isFirstBuild) {
      return;
    }

    log.clear();
    log.done(`${compiler.name} build completed\n`);

    if (stats.hasErrors()) {
      log.fail(`${stats.toJson().errors}\n`);
    }
  });

  compiler.hooks.done.tap(compiler.name, () => {
    if (isFirstBuild) {
      isFirstBuild = false;
    }
  });

  return {
    compiler,

    clearCache() {
      const deletedIds = Object.keys(require.cache)
        .filter(id => id.indexOf(`${serverConfig.output!.path!}/`) === 0)
        .filter(id => delete require.cache[id]);

      if (deletedIds.length) {
        log.info("Server cache cleared");
      }
    },

    watch() {
      return this.compiler.watch({ ignored: reNodeModules }, this.clearCache);
    }
  };
};

export default createServerCompiler;
