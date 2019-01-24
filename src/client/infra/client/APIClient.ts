import ky, { Ky } from "ky";

export type APIClient = Ky;

const createAPIClient = (url: string): APIClient =>
  ky.extend({ prefixUrl: `${url}/api` });

export default createAPIClient;
