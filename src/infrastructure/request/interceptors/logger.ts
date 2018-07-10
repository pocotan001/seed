import { AxiosError, AxiosResponse } from "axios";
import { pick } from "lodash";
import createLogger from "../../logger";

const log = createLogger("[request]");

export const onFulfilled = (resp: AxiosResponse): AxiosResponse => {
  log.info(
    `%o ${resp.config.method ? resp.config.method.toUpperCase() : "-"} ${
      resp.config.url
    }`,
    resp.status
  );

  return resp;
};

export const onRejected = (e: any): Promise<never> => {
  const err = e as AxiosError;

  if (err.response) {
    log.error(
      `%o ${
        err.response.config.method
          ? err.response.config.method.toUpperCase()
          : "-"
      } ${err.response.config.url} with response: %o`,
      err.response.status,
      pick(err.response, ["config", "headers", "data"])
    );
  } else {
    log.error(err.message);
  }

  return Promise.reject(err);
};
