import * as React from "react";
import {
  BreadcrumbItem,
  createBasicMetadata,
  createBreadcrumbListAsJsonLd,
  createTitle
} from "~/domain/Document";
import { RouteAction } from "~/infra/router";

const title = "Markdown";
const description = "markdown description";

const markdown: RouteAction = path => ({
  components: () => [
    import(/* webpackChunkName: "markdown" */ "../components/pages/MarkdownPage")
  ],
  render: MarkdownPage => {
    const breadcrumb: BreadcrumbItem[] = [{ title, path }];

    return {
      chunks: ["markdown"],
      component: <MarkdownPage title={title} breadcrumb={breadcrumb} />,
      title: createTitle(title),
      meta: createBasicMetadata({ title, description, path }),
      jsonLd: [createBreadcrumbListAsJsonLd(breadcrumb)]
    };
  }
});

export default markdown;
