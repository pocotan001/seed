import path from "path";

export interface Config {
  env: {
    name: string;
  };

  http: {
    port: number;
  };

  paths: {
    root: string;
    src: string;
    dist: string;
    static: string;
    public: string;
  };

  webpack: {
    isDebug: boolean;
    isAnalyze: boolean;
  };
}

const createConfig = (): Config => {
  const env = process.env.ENV || "local";
  const root = path.join(__dirname, "..");

  return {
    env: {
      name: env
    },

    http: {
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
    },

    paths: {
      root,
      src: `${root}/src`,
      dist: `${root}/dist`,
      static: `${root}/static`,
      public: `${root}/dist/public`
    },

    webpack: {
      isDebug: env === "local",
      isAnalyze: process.argv.includes("--analyze")
    }
  };
};

export default createConfig;
