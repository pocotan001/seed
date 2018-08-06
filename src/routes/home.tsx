import * as React from "react";
import { IRouteAction } from "~/infra/router";

const TITLE = "Home";

const home: IRouteAction = () => ({
  components: () => [
    import(/* webpackChunkName: "home" */ "../components/pages/HomePage")
  ],
  render: HomePage => ({
    chunks: ["home"],
    component: <HomePage title={TITLE} />,
    title: TITLE,
    meta: [{ name: "description", content: "home description" }]
  })
});

export default home;
