import * as React from "react";
import { RouteAction } from "~/infra/router";

const markdown: RouteAction = () => ({
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
