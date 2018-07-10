import * as React from "react";
import Page from "~/components/layouts/Page";
import Content from "~/components/ui/Content";

const MarkdownPage: React.SFC = () => (
  <Page>
    <Content
      dangerouslySetInnerHTML={{
        __html: preval`
          const fs = require("fs");
          const marked = require("marked");

          module.exports = marked(
            fs.readFileSync(require.resolve("./content.md"), "utf8"),
            { sanitize: true }
          );
        `
      }}
    />
  </Page>
);

export default MarkdownPage;
