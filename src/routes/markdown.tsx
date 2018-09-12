import * as React from "react";
import { createBasicMetadata, createTitle } from "~/domain/Document";
import { RouteAction } from "~/infra/router";

const title = "Markdown";
const description = "markdown description";

const markdown: RouteAction = path => ({
  components: () => [
    import(/* webpackChunkName: "markdown" */ "../components/pages/MarkdownPage")
  ],
  render: MarkdownPage => ({
    chunks: ["markdown"],
    component: <MarkdownPage />,
    title: createTitle(title),
    meta: createBasicMetadata({ title, description, path })
  })
});

export default markdown;
