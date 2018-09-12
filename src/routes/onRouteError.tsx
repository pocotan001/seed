import * as React from "react";
import ErrorPage from "~/components/pages/ErrorPage";
import { createTitle } from "~/domain/Document";
import { normalizeError } from "~/domain/Error";
import { RouteErrorAction } from "~/infra/router";

const onRouteError: RouteErrorAction = err => {
  if (err.status === 401) {
    return { redirect: "/" };
  }

  err = normalizeError(err);

  return {
    status: err.status,
    component: <ErrorPage error={err} />,
    title: createTitle(err.message),
    meta: [{ name: "robots", content: "noindex,nofollow" }]
  };
};

export default onRouteError;
