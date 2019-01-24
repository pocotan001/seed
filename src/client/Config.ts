export interface Config {
  env: {
    name: string;
    isDev: boolean;
    isProd: boolean;
  };

  client: {
    api: {
      url: string;
    };
  };
}

const createConfig = (): Config => ({
  env: {
    name: process.env.ENV || "local",
    isDev: process.env.NODE_ENV !== "production",
    isProd: process.env.NODE_ENV === "production"
  },

  client: {
    api: {
      url: process.env.API_URL
    }
  }
});

export default createConfig;
