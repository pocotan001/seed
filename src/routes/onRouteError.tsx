import * as React from "react";
import ErrorPage from "~/components/pages/ErrorPage";
import { normalizeError } from "~/infrastructure/error";
import { IRouteErrorAction } from "~/infrastructure/router";

const onRouteError: IRouteErrorAction = (err, _, { store }) => {
  if (err.status === 401) {
    return { redirect: "/" };
  }

  err = normalizeError(err);
  store.app.markAsError();

  return {
    status: err.status,
    component: <ErrorPage error={err} />,
    title: err.message,
    meta: [{ name: "robots", content: "noindex,nofollow" }]
  };
};

export default onRouteError;
