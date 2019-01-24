import createClientConfig from "../../webpack/ClientConfig";
import createServerConfig from "../../webpack/ServerConfig";
import { Script } from "../Script";
import createApplication from "./Application";
import createClientCompiler from "./ClientCompiler";
import createRouter from "./Router";
import createServer from "./Server";
import createServerCompiler from "./ServerCompiler";

const dev: Script = async config => {
  const clientConfig = createClientConfig(config);
  const serverConfig = createServerConfig(config);
  const clientCompiler = createClientCompiler(clientConfig);
  const serverCompiler = createServerCompiler(serverConfig);
  const router = createRouter(clientCompiler);
  const app = createApplication(router);
  const server = createServer(app);

  serverCompiler.watch();
  await server.start(config.http.port);
};

export default dev;
