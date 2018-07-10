import * as React from "react";
import { IRouteAction } from "~/infrastructure/router";

const markdown: IRouteAction = () => ({
  components: () => [
    import(/* webpackChunkName: "markdown" */ "../components/pages/MarkdownPage")
  ],
  render: MarkdownPage => ({
    chunks: ["markdown"],
    component: <MarkdownPage />,
    title: "Markdown",
    meta: [{ name: "description", content: "markdown description" }]
  })
});

export default markdown;
