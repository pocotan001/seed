export interface Config {
  env: {
    name: string;
    isDev: boolean;
    isProd: boolean;
  };

  http: {
    port: number;
    inDevServer: boolean; // `npm run dev` is running
  };

  paths: {
    root: string;
    public: string;
  };

  middleware: {
    headers: {
      reportOnly: boolean;
    };

    botProxy: {
      proxyURL?: string;
    };
  };
}

const createConfig = (): Config => {
  const root = __dirname;

  return {
    env: {
      name: process.env.ENV || "local",
      isDev: process.env.NODE_ENV !== "production",
      isProd: process.env.NODE_ENV === "production"
    },

    http: {
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
      inDevServer: process.argv[2] === "dev"
    },

    paths: {
      root,
      public: `${root}/public`
    },

    middleware: {
      headers: {
        reportOnly: process.env.CSP_REPORT_ONLY === "yes"
      },

      botProxy: {
        proxyURL:
          process.env.RENDERTRON_URL && `${process.env.RENDERTRON_URL}/render`
      }
    }
  };
};

export default createConfig;
