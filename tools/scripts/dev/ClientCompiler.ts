import webpack from "webpack";
import log from "../../lib/logger";

export interface ClientCompiler {
  compiler: webpack.Compiler;
}

const createClientCompiler = (
  clientConfig: webpack.Configuration
): ClientCompiler => {
  const clientConfigWithHot: webpack.Configuration = {
    ...clientConfig,
    entry: [
      "webpack-hot-middleware/client?noInfo=true",
      ...(clientConfig.entry as string[])
    ],
    plugins: [
      ...clientConfig.plugins!,
      new webpack.HotModuleReplacementPlugin()
    ]
  };
  const compiler = webpack(clientConfigWithHot);
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
    compiler
  };
};

export default createClientCompiler;
