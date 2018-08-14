import * as React from "react";
import ErrorPage from "~/components/pages/ErrorPage";
import { normalizeError } from "~/domain/Error";
import { IRouteErrorAction } from "~/infra/router";

const onRouteError: IRouteErrorAction = err => {
  if (err.status === 401) {
    return { redirect: "/" };
  }

  err = normalizeError(err);

  return {
    status: err.status,
    component: <ErrorPage error={err} />,
    title: err.message,
    meta: [{ name: "robots", content: "noindex,nofollow" }]
  };
};

export default onRouteError;
