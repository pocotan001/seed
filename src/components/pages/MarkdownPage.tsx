import * as React from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import { Content, Heading } from "~/components/ui";
import { BreadcrumbItem } from "~/domain/Document";

interface MarkdownPageProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

const MarkdownPage: React.SFC<MarkdownPageProps> = ({ title, breadcrumb }) => (
  <DefaultLayout breadcrumb={breadcrumb}>
    <Heading mb={24}>{title}</Heading>
    <Content
      dangerouslySetInnerHTML={{
        __html: preval`
          const fs = require("fs");
          const marked = require("marked");

          module.exports = marked(
            fs.readFileSync(require.resolve("../../assets/md/demo.md"), "utf8"),
            { headerIds: false, sanitize: true }
          );
        `
      }}
    />
  </DefaultLayout>
);

export default MarkdownPage;
