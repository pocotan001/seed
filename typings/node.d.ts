declare namespace NodeJS {
  interface ProcessEnv {
    ENV: "test" | "local" | "development" | "staging" | "production";
    NODE_ENV: "test" | "development" | "production";
    API_URL: string;
    CONSOLA_LEVEL: string;
    PORT?: string; // Server only
    CSP_REPORT_ONLY?: "yes" | "no"; // Server only
  }
}
