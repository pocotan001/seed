import * as React from "react";
import { createBasicMetadata, createTitle } from "~/domain/Document";
import { RouteAction } from "~/infra/router";

const title = "Home";
const description = "home description";

const home: RouteAction = path => ({
  components: () => [
    import(/* webpackChunkName: "home" */ "../components/pages/HomePage")
  ],
  render: HomePage => ({
    chunks: ["home"],
    component: <HomePage title={title} />,
    title: createTitle(title),
    meta: createBasicMetadata({ title, description, path })
  })
});

export default home;
