import * as React from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import { Content } from "~/components/ui";

const MarkdownPage: React.SFC = () => (
  <DefaultLayout>
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
